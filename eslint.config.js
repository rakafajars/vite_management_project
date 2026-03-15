import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default defineConfig([
  // --- 1. DAFTAR HITAM (GLOBAL IGNORE) ---
  // Memberitahu ESLint untuk mengabaikan folder hasil build dan library luar
  globalIgnores([
    "dist",
    "node_modules",
    "coverage",
    "build",
    "public",
    "out",
    "lib",
  ]),

  // --- 2. REKOMENDASI DASAR JAVASCRIPT ---
  // Mengaktifkan aturan standar JS (seperti deteksi variabel yang tidak didefinisikan)
  js.configs.recommended,

  {
    // Hanya periksa file dengan ekstensi .js dan .jsx
    files: ["**/*.{js,jsx}"],

    // --- 3. PLUGINS ---
    // Memasukkan "otak" tambahan agar ESLint paham aturan khusus React, Import, dan Aksesibilitas
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y,
      "react-refresh": pluginReactRefresh,
      import: pluginImport,
    },

    // --- 4. LINGKUNGAN RUNTIME ---
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Izinkan sintaks JSX
      },
      globals: {
        ...globals.browser, // Mengenali variabel browser seperti 'window' atau 'document'
      },
    },

    // --- 5. DETEKSI VERSI ---
    settings: {
      react: {
        version: "detect", // Otomatis cek versi React di package.json
      },
    },

    // --- 6. ATURAN MAIN (RULES) ---
    rules: {
      // Mengambil aturan rekomendasi dari masing-masing plugin
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,

      // Aturan khusus Vite Refresh agar Hot Module Replacement lancar
      "react-refresh/only-export-components": "warn",

      // React 17+ tidak wajib "import React from 'react'", jadi kita matikan error-nya
      "react/react-in-jsx-scope": "off",

      // Memberi peringatan jika ada tag yang bisa ditutup sendiri (contoh: <div />)
      "react/self-closing-comp": "warn",

      // Mematikan validasi prop-types (biasanya jika kamu nantinya pakai TypeScript)
      "react/prop-types": "off",

      // Memberi peringatan jika ada console.log yang tertinggal (agar kode bersih)
      "no-console": "warn",

      // Error jika ada variabel tak terpakai, kecuali diawali underscore (contoh: _unused)
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", args: "none" }],

      // --- PENGATURAN IMPORT ---
      // Mengatur agar urutan import rapi: Library luar di atas, file lokal di bawah
      "import/order": [
        "warn",
        {
          groups: [
            "builtin", // fs, path, dll
            "external", // react, axios, dll
            "internal", // folder src
            "parent", // ../
            "sibling", // ./
            "index",
          ],
          "newlines-between": "always", // Kasih baris kosong antar grup
          alphabetize: { order: "asc", caseInsensitive: true }, // Urutkan sesuai abjad
          warnOnUnassignedImports: true,
        },
      ],

      // Membantu merapikan import yang banyak di dalam satu kurung kurawal { ... }
      "sort-imports": [
        "warn",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true, // Biarkan 'import/order' yang mengatur urutan baris
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],
    },
  },

  // --- 7. PENENGAH PRETTIER ---
  // WAJIB ditaruh paling bawah untuk mematikan aturan ESLint yang bentrok dengan Prettier
  prettierConfig,
]);
