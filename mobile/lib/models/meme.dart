class Meme {
  final String id;
  final String title;
  final String topText;
  final String bottomText;
  final String template;
  final String author;
  final int votes;
  final int createdAt;

  Meme({
    required this.id,
    required this.title,
    required this.topText,
    required this.bottomText,
    required this.template,
    required this.author,
    required this.votes,
    required this.createdAt,
  });

  factory Meme.fromJson(Map<String, dynamic> json) {
    return Meme(
      id: json['id'],
      title: json['title'],
      topText: json['top_text'] ?? '',
      bottomText: json['bottom_text'] ?? '',
      template: json['template'],
      author: json['author'],
      votes: json['votes'] ?? 0,
      createdAt: json['created_at'] ?? 0,
    );
  }

  DateTime get createdDate =>
      DateTime.fromMillisecondsSinceEpoch(createdAt * 1000);
}
