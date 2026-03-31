import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: { id: string } };

/**
 * @swagger
 * /api/memes/{id}:
 *   delete:
 *     summary: Delete a meme by ID
 *     description: Removes a meme and all associated votes (cascading delete)
 *     tags: [Memes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique identifier of the meme to delete
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Meme and associated votes deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Meme and associated votes deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     changes:
 *                       type: integer
 *                       description: Number of rows affected (should be 1 for meme deletion)
 *                       example: 1
 *                     lastInsertRowid:
 *                       type: integer
 *                       example: 42
 *       404:
 *         description: Meme not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Meme not found"
 *       500:
 *         description: Internal server error or deletion failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error Error: Database constraint failed"
 *     security:
 *       - apiKey: []
 *     x-code-samples:
 *       - lang: curl
 *         source: |
 *           curl -X DELETE "https://api.example.com/api/memes/550e8400-e29b-41d4-a716-446655440000"
 *       - lang: javascript
 *         source: |
 *           fetch('https://api.example.com/api/memes/550e8400-e29b-41d4-a716-446655440000', {
 *             method: 'DELETE'
 *           })
 *           .then(res => res.json())
 *           .then(data => console.log(data));
 */
export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const db = getDb();

    const meme = db.prepare("SELECT * FROM memes WHERE id = ?").get(params.id);

    if (!meme)
      return NextResponse.json({ error: "Meme not found" }, { status: 404 });

    const deleteMeme = db.transaction(() => {
      db.prepare("DELETE FROM votes WHERE meme_id = ?").run(params.id);
      return db.prepare("DELETE FROM memes WHERE id = ?").run(params.id);
    });

    const result = deleteMeme();

    if (result.changes === 0) {
      return NextResponse.json(
        { error: "Failed to delete meme" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Meme and associated votes deleted successfully",
      data: result,
    });
  } catch (e) {
    return NextResponse.json(
      { error: `Internal server error ${e}` },
      { status: 500 },
    );
  }
}

/**
 * @swagger
 * /api/memes/{id}:
 *   get:
 *     summary: Get a single meme by ID
 *     description: Retrieves detailed information about a specific meme including its title, text, template, and metadata
 *     tags: [Memes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique identifier of the meme
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Meme retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Meme'
 *             example:
 *               data:
 *                 id: "550e8400-e29b-41d4-a716-446655440000"
 *                 title: "Quando o café acaba na sexta"
 *                 top_text: "Fazer hora extra"
 *                 bottom_text: "Sair correndo às 18h"
 *                 template: "drake"
 *                 author: "dev_cansado"
 *                 votes: 42
 *                 created_at: "2024-01-15T10:30:00Z"
 *       404:
 *         description: Meme not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Meme not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error Error: Database connection failed"
 *     x-code-samples:
 *       - lang: curl
 *         source: |
 *           curl "https://api.example.com/api/memes/550e8400-e29b-41d4-a716-446655440000"
 *       - lang: javascript
 *         source: |
 *           fetch('https://api.example.com/api/memes/550e8400-e29b-41d4-a716-446655440000')
 *             .then(res => res.json())
 *             .then(data => console.log(data.data));
 *       - lang: python
 *         source: |
 *           import requests
 *           response = requests.get('https://api.example.com/api/memes/550e8400-e29b-41d4-a716-446655440000')
 *           data = response.json()
 *           print(data['data'])
 */
export async function GET(_: NextRequest, { params }: Params) {
  try {
    const db = getDb();
    const meme = db.prepare("SELECT * FROM memes WHERE id = ?").get(params.id);
    if (!meme) {
      return NextResponse.json({ error: "Meme not found" }, { status: 404 });
    }

    return NextResponse.json({ data: meme }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: `Internal server error ${e}` },
      { status: 500 },
    );
  }
}
