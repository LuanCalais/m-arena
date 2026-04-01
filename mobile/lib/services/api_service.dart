import 'dart:convert';

import 'package:meme_arena/models/meme.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:uuid/uuid.dart';

class ApiService {
  static const String baseUrl = 'http://192.168.0.5:3000/api';

  static Future<String> getSession() async {
    final prefs = await SharedPreferences.getInstance();
    String? session = prefs.getString('meme_session');
    if (session == null) {
      session = const Uuid().v4();
      await prefs.setString('meme_session', session);
    }
    return session;
  }

  static Future<List<Meme>> getMemes({String sort = 'hot'}) async {
    final response = await http.get(Uri.parse('$baseUrl/memes?sort=$sort'));
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final List list = data['memes'];
      return list.map((json) => Meme.fromJson(json)).toList();
    }

    throw Exception('Erro ao buscar memes: ${response.statusCode}');
  }
}
