import 'package:flutter/material.dart';
import 'package:meme_arena/models/meme.dart';
import 'package:meme_arena/services/api_service.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Meme> memes = [];
  bool loading = true;
  String sort = 'hot';
  String? error;

  @override
  void initState() {
    super.initState();
    fetchMemes();
  }

  Future<void> fetchMemes() async {
    setState(() {
      loading = true;
      error = null;
    });

    try {
      final result = await ApiService.getMemes(sort: sort);
      setState(() {
        memes = result;
        loading = false;
      });
    } catch (e) {
      setState(() {
        error = 'Erro ao conectar com a arena. Servidor ligado?';
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: Text('Homepage screen works')),
    );
  }
}
