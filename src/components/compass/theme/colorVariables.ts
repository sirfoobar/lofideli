
import React from 'react';

// Simplified version of the colorVariables without using @emotion/core
export const currentColors = {
  "--white": "rgba(255, 255, 255, 1)",
  "--cg-30": "rgba(250, 250, 250, 1)",
  "--cg-40": "rgba(247, 247, 247, 1)",
  "--cg-50": "rgba(241, 241, 241, 1)",
  "--cg-60": "rgba(237, 237, 237, 1)",
  "--cg-70": "rgba(235, 235, 235, 1)",
  "--cg-80": "rgba(232, 232, 232, 1)",
  "--cg-90": "rgba(227, 227, 227, 1)",
  "--cg-100": "rgba(212, 212, 212, 1)",
  "--cg-200": "rgba(195, 197, 201, 1)",
  "--cg-300": "rgba(164, 168, 176, 1)",
  "--cg-400": "rgba(133, 139, 151, 1)",
  "--cg-500": "rgba(107, 115, 133, 1)",
  "--cg-600": "rgba(76, 86, 104, 1)",
  "--cg-650": "rgba(56, 69, 92, 1)",
  "--cg-700": "rgba(48, 61, 82, 1)",
  "--cg-800": "rgba(28, 39, 58, 1)",
  "--cg-900": "rgba(15, 28, 46, 1)",
  "--blue-50": "rgba(235, 242, 255, 1)",
  "--blue-100": "rgba(214, 227, 250, 1)",
  "--blue-200": "rgba(168, 201, 255, 1)",
  "--blue-300": "rgba(115, 176, 255, 1)",
  "--blue-400": "rgba(82, 145, 255, 1)",
  "--blue-500": "rgba(26, 102, 247, 1)",
  "--blue-600": "rgba(33, 82, 229, 1)",
  "--blue-700": "rgba(0, 61, 184, 1)",
  "--blue-800": "rgba(0, 41, 133, 1)",
  "--blue-900": "rgba(0, 23, 84, 1)",
  "--green-50": "rgba(227, 245, 229, 1)",
  "--green-100": "rgba(196, 237, 207, 1)",
  "--green-200": "rgba(148, 229, 171, 1)",
  "--green-300": "rgba(92, 196, 128, 1)",
  "--green-slime": "rgba(0, 219, 116, 1)",
  "--green-400": "rgba(0, 166, 87, 1)",
  "--green-500": "rgba(0, 133, 66, 1)",
  "--green-600": "rgba(0, 110, 56, 1)",
  "--green-700": "rgba(0, 82, 41, 1)",
  "--green-800": "rgba(0, 56, 26, 1)",
  "--green-900": "rgba(0, 33, 10, 1)",
  "--red-50": "rgba(255, 240, 237, 1)",
  "--red-100": "rgba(252, 219, 214, 1)",
  "--red-200": "rgba(255, 199, 191, 1)",
  "--red-300": "rgba(237, 145, 135, 1)",
  "--red-400": "rgba(237, 97, 89, 1)",
  "--red-500": "rgba(204, 66, 66, 1)",
  "--red-600": "rgba(176, 38, 46, 1)",
  "--red-700": "rgba(143, 0, 28, 1)",
  "--red-800": "rgba(102, 0, 15, 1)",
  "--red-900": "rgba(59, 5, 3, 1)",
};

export const applyCurrentColors = () => {
  const style = document.createElement('style');
  style.textContent = Object.entries(currentColors)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n');
  document.head.appendChild(style);
};
