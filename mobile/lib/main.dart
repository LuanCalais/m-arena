import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const MemeArenaApp());
}

class MemeArenaApp extends StatelessWidget {
  const MemeArenaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Meme Arena',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.dark(
          primary: const Color(0xFFFF2D55),
          secondary: const Color(0xFF00E5FF),
          surface: const Color(0xFF13131a),
        ),
        scaffoldBackgroundColor: const Color(0xFF0a0a0f),
        useMaterial3: true,
      ),
      home: HomeScreen(),
    );
  }
}
