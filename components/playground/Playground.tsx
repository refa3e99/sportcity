'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Download, RotateCcw, Type, Image as ImageIcon, Shirt, Palette, Trash2, ChevronRight, X, Eye } from 'lucide-react';
import type { DesignElement } from './DesignCanvas';

// Dynamically import the canvas to avoid SSR issues with Konva
const DesignCanvas = dynamic(() => import('./DesignCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Loading Canvas...</p>
      </div>
    </div>
  ),
});

const CLOTHING_COLORS = [
  { name: 'White', value: '#ffffff' },
  { name: 'Black', value: '#1e293b' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Purple', value: '#9333ea' },
  { name: 'Gray', value: '#94a3b8' },
];

const FONTS = [
  { name: 'Bebas Neue', value: 'var(--font-bebas)' },
  { name: 'Inter', value: 'var(--font-sans)' },
  { name: 'Arial', value: 'Arial' },
  { name: 'Impact', value: 'Impact' },
];

const LOGOS = [

  {id:'adidasOld', src:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nODAwcHgnIGhlaWdodD0nODAwcHgnIHZpZXdCb3g9JzAgMCAxOTIuNzU2IDE5Mi43NTYnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTEyOS44MjYgMTY2Ljk4M2MtMi4yOTUtLjM2NC00LjMzOC0uNDc2LTQuMzM4LTEuNzA4IDAtLjQ3Ni4yNzktLjk3OS43MjctMS4zMTQuMzkzLS4zMDkgMS40MjgtLjQyMSAyLjEyNy0uNDIxLjcyOSAwIDEuNDU3LjM2NCAxLjkwNC44NC4yNzkuMzM2LjYxNS44NjguNjcyIDEuNDI4aDMuNzIzYy0uMDg0LTEuMzcxLS42NzItMi43MTUtMS43MzYtMy40NzEtMS4wMzUtLjc1Ni0yLjM3OS0xLjY4LTQuMjI3LTEuNjgtMS43NjIgMC0zLjQ5OC4wNTctNC43MDEuOTUyLTEuMjA1Ljg2Ny0yLjA3MiAyLjMyMi0yLjA3MiAzLjU4MyAwIC43MjgtLjA1NSAxLjU5NS4yMjUgMi4xMjYuMzA5LjUzMiAxLjIwMyAxLjYyNSAxLjkwMiAyLjA0NC45OC41NiAzLjI3NS43ODQgNC41MzUgMS4xMiAxLjAzNS4yNTEgMi4yOTUuMzA4IDIuNTc2IDEuMzQ0LjE2Ni42MTUtLjAyOSAxLjE3NS0uNTg4IDEuNTM5LS41MzMuMzYzLTEuMzQ0LjYxNS0yLjI0LjYxNS0uOTI0IDAtMS44Mi0uMjc5LTIuMjY4LS44MzktLjM5MS0uNTMyLS42MTUtMS4wMzYtLjkyNC0xLjg0OEgxMjEuNGMuMDg0IDEuNzA3IDEuMDM3IDMuMzg3IDIuMjExIDQuMzM5IDEuMTQ4LjkyNCAyLjY4OCAxLjM3MSA0LjY0NiAxLjM3MSAxLjk2MSAwIDMuNjY4LS4zMzYgNC45MjgtMS4yMzIgMS4yMy0uODk1IDEuOTAyLTIuNTc0IDEuOTAyLTMuOTQ1IDAtMS4xNzYtLjMzNi0yLjEtLjg2Ny0yLjgyNy0xLjA5MS0xLjQyOC0zLjA1LTEuODE5LTQuMzk0LTIuMDE2ek04MS4yOTEgMTc2LjU1N2gzLjc3OXYtMTUuNjc2aC0zLjc3OXYxNS42NzZ6TTgxLjI5MSAxNTkuODE4aDMuODA3di0zLjc3OWgtMy44MDd2My43Nzl6TTc1Ljc3NyAxNjIuOTUzYy0xLjM5OS0xLjA5My0zLjE5LTEuODQ4LTUuMTUtMS45MDRoLS4xOTZjLTQuMzM5IDAtNy44NjUgMy41MjctNy44NjUgNy44MzggMCA0LjMzOCAzLjUyNiA3Ljg5MyA3Ljg2NSA3Ljg5M2guMTk2YzEuOTU5LS4wMjcgMy43NS0uODEyIDUuMTIzLTIuMTU1bC4wMjcgMS45MzNoMy41ODNWMTU2LjA0aC0zLjU4M3Y2LjkxM3ptLTUuMTIyIDEwLjYwOGgtLjAyOGE0LjY4MiA0LjY4MiAwIDAgMS00LjY3NC00LjY3NGMwLTIuNTQ3IDIuMDk5LTQuNjc0IDQuNjc0LTQuNjc0aC4wMjhjMi41NDcgMCA0LjY3NCAyLjA5OSA0LjY3NCA0LjY3NHMtMi4xMjcgNC42NzQtNC42NzQgNC42NzR6TTk5LjIzMiAxNjIuODk2Yy0xLjM5OC0xLjA5Mi0zLjE5LTEuODQ4LTUuMTUtMS45MDNoLS4xOTZjLTQuMzM4IDAtNy44OTMgMy41NTUtNy44OTMgNy44NjUgMCA0LjMzOSAzLjU1NSA3Ljg5NCA3Ljg5MyA3Ljg5NGguMTk2YzEuOTU5LS4wNTYgMy43MjItLjg0IDUuMTIzLTIuMTg0djEuOTMyaDMuNTgydi0yMC40ODhoLTMuNTgybC4wMjcgNi44ODR6bS01LjE0OSAxMC42MzdjLTIuNTc1IDAtNC43MDItMi4xMjctNC43MDItNC43MDIgMC0yLjU0OCAyLjEyNy00LjY0NiA0LjcwMi00LjY0NnM0LjcwMyAyLjA5OSA0LjcwMyA0LjY0NmMtLjAwMSAyLjU3NS0yLjEyOCA0LjcwMi00LjcwMyA0LjcwMnpNNTcuNTI3IDE2MC44ODF2MS40ODRjLS43MjgtLjc4NC0xLjA2My0xLjAzNS0xLjkwMy0xLjM0NC0uNzU2LS4yNzktMS43OTItLjUzMi0yLjgtLjU2aC0uMTY3Yy0xLjIwNCAwLTIuMjY3LjE5NS0zLjIxOS41ODctLjkyNC4zOTMtMS43OTIgMS4wMDgtMi41NzUgMS44NDgtLjcuNzI5LTEuMjU5IDEuNjIzLTEuNjc5IDIuNjA0YTguNjk3IDguNjk3IDAgMCAwLS41NiAzLjA3OGMwIDIuMzguNzg0IDQuMzY3IDIuMzUxIDUuOTA2IDEuNTQgMS41NjcgMy40OTkgMi4zOCA1Ljg1IDIuMzhoLjAyOGMuOTUyIDAgMS45ODctLjI4IDIuODI3LS41ODkuODM5LS4zMDggMS40NTYtLjU2IDEuODQ3LTEuMTE5djEuNDI4bDMuNjM5LS4wMjctLjAyOC0xNS43MDMtMy42MTEuMDI3em0tNC42NzQgMTIuNDI4aC0uMDI4YTQuNjM0IDQuNjM0IDAgMCAxLTQuNjQ2LTQuNjQ2IDQuNjUyIDQuNjUyIDAgMCAxIDQuNjQ2LTQuNjQ2aC4wMjhjMi41NDcgMCA0LjY0NiAyLjA5OSA0LjY0NiA0LjY0NmE0LjY1MiA0LjY1MiAwIDAgMS00LjY0NiA0LjY0NnpNMTE2Ljg5NSAxNjAuODI1bC4wMjcgMS40ODNjLS43MjctLjc1NS0xLjA5LTEuMDA4LTEuOTAyLTEuMzQ0YTkuNDIzIDkuNDIzIDAgMCAwLTIuNzk5LS41MzFoLS4xNjhjLTEuMjA1IDAtMi4yNjguMTk1LTMuMjE5LjU2LS45NTMuMzkzLTEuODIgMS4wMzYtMi41NzYgMS44NDgtLjcyNy43MjgtMS4yODcgMS42MjMtMS42OCAyLjYzMmE4LjYxNiA4LjYxNiAwIDAgMC0uNTg4IDMuMDc4YzAgMi4zNTIuODEyIDQuMzM4IDIuMzgxIDUuOTA2IDEuNTEgMS41MzkgMy40OTggMi4zNTEgNS44NSAyLjM1MS45NzkgMCAyLjAxNC0uMjUxIDIuODI2LS41ODcuODQtLjMwOSAxLjQ4NC0uNTYxIDEuODc1LTEuMTJ2MS40MjhsMy42MzktLjAyOC0uMDU1LTE1LjY3NWgtMy42MTF2LS4wMDF6bS00LjY3NCAxMi40NTZjLTIuNTc2LS4wMjgtNC42NzYtMi4xLTQuNjc2LTQuNjc1IDAtMi41NDcgMi4xLTQuNjE4IDQuNjc2LTQuNjQ2IDIuNTc0IDAgNC42NzQgMi4wOTkgNC42NzQgNC42NDYgMCAyLjU3Ni0yLjEgNC42NzUtNC42NzQgNC42NzV6TTEzOC4yNTIgMTUyLjU0Yy0uMDI5IDAtLjA1Ny0uMDI3LS4wNTctLjAyNy0yLjQzNiAwLTQuNDIyIDEuOTg3LTQuNDIyIDQuNDIyczEuOTg2IDQuMzk2IDQuNDIyIDQuMzk2aC4wNTdjMi40MDYtLjAyOSA0LjM2NS0xLjk4OCA0LjM2NS00LjM5NnMtMS45NTktNC4zNjctNC4zNjUtNC4zOTV6bTAgOC4wODlhMy42OSAzLjY5IDAgMCAxLTMuNjk1LTMuNjk0YzAtMS45ODcgMS42NS0zLjY2NyAzLjY5NS0zLjYzOSAyLjA0MyAwIDMuNjkzIDEuNjUxIDMuNjkzIDMuNjY3IDAgMi4wMTUtMS42NSAzLjY2Ni0zLjY5MyAzLjY2NnonLz48cGF0aCBkPSdNMTM5LjUzOSAxNTcuNjYyYTMuMDM0IDMuMDM0IDAgMCAwLS41MzEtLjQxOWMuNDItLjA1Ny43NTQtLjIyNS45NTEtLjQ3Ny4xOTUtLjE5NS4zMzYtLjUwMy4zMzYtLjg0IDAtLjI3OS0uMTEzLS41Ni0uMjI1LS43ODNhMS40MDQgMS40MDQgMCAwIDAtLjU2MS0uNDQ4Yy0uMjIzLS4wODQtLjU4OC0uMTExLTEuMTE5LS4xMTFoLTIuMDQzdjQuNzg1aC45OHYtMi4wMTVoLjE2OGMuMjIzIDAgLjM5MS4wMjguNTAyLjA1Ni4xMTMuMDI5LjE3LjA4NC4yNTQuMTY5IDAgLjAyNy4wMjcuMDI3LjAyNy4wNTYuMTExLjA1Ni4yNzkuMzA4LjUzMS42NzJsLjY5OSAxLjA2MmgxLjE0OGwtLjU4OC0uOTIzYy0uMjIyLS4zNjQtLjQxOC0uNjcyLS41MjktLjc4NHptLTEuMjg3LTEuMDYySDEzNy4zMjh2LTEuMjA0SDEzOC4yNTJjLjI3OSAwIC40NzUgMCAuNTMxLjAyOGEuNTUuNTUgMCAwIDEgLjM2My4xNjhjLjExMS4wODMuMTQxLjIyNC4xNDEuMzYzcy0uMDI5LjMwOS0uMTEzLjM5MmMtLjA4Mi4wNTctLjE2Ni4xNC0uMjUyLjE5Ni0uMTExLjAyOC0uMzM0LjAyOC0uNjcuMDU3ek04MC45MjcgMTMxLjM1Mkg0OC45OTFjOS41NDQgNS45MDYgMjAuNzEzIDkuODI1IDMzLjQyIDEyLjQ1NmwtMS40ODQtMTIuNDU2em0yNC4zNTIuMDI4bC0xLjkwNCAxMS42OTljMTIuNzY0LTIuMzUxIDI0LjAxNi02LjA0NSAzMy43ODUtMTEuNjk5aC0zMS44ODF6bS0zLjY2OC0uMDU2bC0xNy41NDkuMDI3YzIuNDYzIDUuMTIyIDUuNTk5IDkuNDMzIDkuMTgxIDEzLjU0OCAzLjUyNy00LjE5OSA1Ljg3OC04LjUzNyA4LjM2OC0xMy41NzV6bTQ3LjIyMS03Ljc4MWwtMTExLjcwOS0uMDU3Yy0zLjcyMy0yLjk2Ny02LjI0Mi00LjUwNi05LjIzNy04LjQ1M2gxMzAuMzIxYy0yLjkxIDMuMTkyLTYuMjQgNi4wNzQtOS4zNzUgOC41MXptMTYuNjUyLTE4LjE5NGwtMTQ0LjM3Mi4wNTZjLTEuOTMxLTIuNjg3LTQuMTQzLTYuNDY1LTUuNTE0LTkuNDZIMTcxYy0xLjQ1NSAzLjM1OC0zLjQxNiA2LjQ2NS01LjUxNiA5LjQwNHpNNjIuMTczIDg1LjdsLTUwLjQxLjAyOEM3LjE0NSA3NS4wNjMgNC4yMzQgNjQuMDYzIDIuODM0IDUwLjQwNCAyOC44MSA1NS4wMjIgNDguODUxIDY1LjY4NyA2Mi4xNzMgODUuN3ptNTEuNjQzLjA4NEg3Mi4zNjJjLS45MjQtMjYuNjc1IDYuNDY2LTUzLjc0MiAyMC43NDEtNzAuMDMyIDE0LjQ5OSAxNS44NzEgMjIuMDAxIDQyLjgyNSAyMC43MTMgNzAuMDMyem02MS40MzgtLjA1NmwtNTEuMzkxLjAyOGMxNC4xOTEtMTkuOTU3IDM0LjU2OC0zMS4yMzcgNjAuOTYzLTM1LjI0LTEuNjUgMTMuMzUyLTQuNzMgMjQuNjg3LTkuNTcyIDM1LjIxMnpNMTgwLjA5NiAyNy4yMjljLS4wNTUtLjAyOC0uMTExLS4wMjgtLjE2OC0uMDI4LTUuNDMgMC05LjkwOCA0LjQ1MS05LjkwOCA5Ljg4MSAwIDUuNDMgNC40NzkgOS44OCA5LjkwOCA5Ljg4aC4xNjhjNS40MzItLjA4MyA5LjgyNi00LjUwNiA5LjgyNi05Ljg4IDAtNS4zNzUtNC4zOTUtOS43Ny05LjgyNi05Ljg1M3ptMCAxOC4xOTNjLTQuNTMzIDAtOC4yNTYtMy43NTEtOC4yNTYtOC4yODUgMC00LjQ3OSAzLjcyMy04LjI1NyA4LjI1Ni04LjIwMSA0LjU5MiAwIDguMjg1IDMuNzIzIDguMjg1IDguMjI5IDAgNC41NjItMy42OTMgOC4yNTctOC4yODUgOC4yNTd6Jy8+PHBhdGggZD0nTTE4Mi45NzkgMzguNzMyYTYuNTQ3IDYuNTQ3IDAgMCAwLTEuMTQ2LS45MjRjLjkyNC0uMTQgMS42NS0uNDQ4IDIuMTU0LTEuMDM2LjQ0OS0uNDc2LjcwMS0xLjE0OC43MDEtMS45MzEgMC0uNjQ0LS4yMjUtMS4yMzItLjUwNC0xLjczNi0uMzA5LS40NDgtLjc4NS0uODM5LTEuMjg5LS45NzktLjUwMi0uMjI0LTEuMzQyLS4zMzUtMi41MTgtLjMzNWgtNC40Nzh2MTAuNzc1aDIuMVYzOC4wNmguNDQ3Yy41MDQgMCAuODY3LjAyNyAxLjExOS4xMTIuMTY4LjA4NC4zNjMuMTk2LjUzMS4zNjQuMDI5LjAyOC4wODYuMDU2LjExMy4wODQuMTY4LjI1Mi41NTkuNzU2IDEuMTQ2IDEuNTk2bDEuNTM5IDIuMzUxaDIuNjA0bC0xLjI4Ny0yLjA3MWMtLjUwNC0uODQtLjk1MS0xLjQ4NC0xLjIzMi0xLjc2NHptLTIuODgzLTIuNDA3aC0yLjA5OHYtMi42NTloMi4wOThjLjYxNyAwIDEuMDM3IDAgMS4xNzYuMDI4LjM5My4wMjguNjcyLjIyNC44NC40Mi4yMjUuMTY3LjI4MS41MDQuMjgxLjgzOSAwIC4yOC0uMDU3LjYxNi0uMTk3Ljg0LS4xNjguMTY4LS4zNjMuMzM2LS42NDMuNDItLjIyNS4wNTYtLjY3Mi4wODQtMS40NTcuMTEyeicvPjwvc3ZnPg==', name: 'Adidas Classic'},
  {id:'nike', src:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nODAwcHgnIGhlaWdodD0nODAwcHgnIHZpZXdCb3g9JzAgMCAxOTIuNzU2IDE5Mi43NTYnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTQyLjc0MSA3MS40NzdjLTkuODgxIDExLjYwNC0xOS4zNTUgMjUuOTk0LTE5LjQ1IDM2Ljc1LS4wMzcgNC4wNDcgMS4yNTUgNy41OCA0LjM1NCAxMC4yNTYgNC40NiAzLjg1NCA5LjM3NCA1LjIxMyAxNC4yNjQgNS4yMjEgNy4xNDYuMDEgMTQuMjQyLTIuODczIDE5Ljc5OC01LjA5NiA5LjM1Ny0zLjc0MiAxMTIuNzktNDguNjU5IDExMi43OS00OC42NTkuOTk4LS41LjgxMS0xLjEyMy0uNDM4LS44MTItLjUwNC4xMjYtMTEyLjYwMyAzMC41MDUtMTEyLjYwMyAzMC41MDVhMjQuNzcxIDI0Ljc3MSAwIDAgMS02LjUyNC45MzRjLTguNjE1LjA1MS0xNi4yODEtNC43MzEtMTYuMjE5LTE0LjgwOC4wMjQtMy45NDMgMS4yMzEtOC42OTggNC4wMjgtMTQuMjkxeicvPjwvc3ZnPg==', name: 'Nike'},
  {id:'adidas', src:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nODAwcHgnIGhlaWdodD0nODAwcHgnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMS4zMjk1MiAxOUwwLjczMTQ0NSAxNy45NjQxTDUuMDYxNTcgMTUuNDY0MUw3LjEwMzAyIDE5SDEuMzI5NTJaJyBmaWxsPScjMDAwMDAwJy8+PHBhdGggZD0nTTE1LjE4NTkgMTlIOS40MTI0M0w1Ljc5MzYyIDEyLjczMjFMMTAuMTIzNyAxMC4yMzIxTDE1LjE4NTkgMTlaJyBmaWxsPScjMDAwMDAwJy8+PHBhdGggZD0nTTIzLjI2ODggMTlIMTcuNDk1M0wxMC44NTU4IDcuNUwxNS4xODU5IDVMMjMuMjY4OCAxOVonIGZpbGw9JyMwMDAwMDAnLz48L3N2Zz4=', name: 'Adidas'},
  { id: 'logo1', src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMTAgOTAgTDUwIDEwIEw5MCA5MCBaIiBmaWxsPSIjZGMyNjI2Ii8+PC9zdmc+', name: 'Triangle' },
  { id: 'logo2', src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iIzI1NjNlYiIvPjwvc3ZnPg==', name: 'Circle' },
  { id: 'logo3', src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzE2YTM0YSIvPjwvc3ZnPg==', name: 'Square' },
  { id: 'logo4', src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cG9seWdvbiBwb2ludHM9IjUwLDEwIDYxLDM5IDkyLDM5IDY3LDU4IDc2LDg5IDUwLDcwIDI0LDg5IDMzLDU4IDgsMzkgMzksMzkiIGZpbGw9IiNlYWIzMDgiLz48L3N2Zz4=', name: 'Star' },
];

export default function Playground() {
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const [clothingType, setClothingType] = useState<'tshirt' | 'hoodie' | 'jersey'>('tshirt');
  const [view, setView] = useState<'front' | 'back'>('front');
  const [clothingColor, setClothingColor] = useState(CLOTHING_COLORS[0].value);
  
  const [activeTab, setActiveTab] = useState<'text' | 'logos' | 'product'>('product');
  const [showInstructions, setShowInstructions] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  // Auto-hide instructions after 5 seconds
  useEffect(() => {
    if (showInstructions) {
      const timer = setTimeout(() => {
        setShowInstructions(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showInstructions]);

  // Text state
  const [textInput, setTextInput] = useState('TEAM NAME');
  const [fontFamily, setFontFamily] = useState(FONTS[0].value);
  const [textColor, setTextColor] = useState('#1e293b');

  // Handle selected element updates
  useEffect(() => {
    if (selectedId) {
      const el = elements.find(e => e.id === selectedId);
      if (el && el.type === 'text') {
        setTextInput(el.text || '');
        setFontFamily(el.fontFamily || FONTS[0].value);
        setTextColor(el.fill || '#1e293b');
        setActiveTab('text');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const addText = () => {
    const newEl: DesignElement = {
      id: crypto.randomUUID(),
      type: 'text',
      view: view,
      x: 100,
      y: 150,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      text: textInput,
      fontSize: 48,
      fontFamily: fontFamily,
      fill: textColor,
    };
    setElements([...elements, newEl]);
    setSelectedId(newEl.id);
  };

  const addLogo = (src: string) => {
    const newEl: DesignElement = {
      id: crypto.randomUUID(),
      type: 'logo',
      view: view,
      x: 150,
      y: 200,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      src: src,
      width: 100, // Default width for logos
      height: 100,
    } as any; // Cast to any to bypass strict type checking for width/height which are added dynamically
    setElements([...elements, newEl]);
    setSelectedId(newEl.id);
  };

  const updateSelectedText = (updates: Partial<DesignElement>) => {
    if (!selectedId) return;
    setElements(elements.map(el => 
      el.id === selectedId ? { ...el, ...updates } : el
    ));
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setElements(elements.filter(el => el.id !== selectedId));
    setSelectedId(null);
  };

  const resetDesign = () => {
    setElements([]);
    setSelectedId(null);
  };

  const handleDownload = () => {
    // In a real app, we would get the canvas data URL and trigger a download
    alert('Download feature would generate an image of your design here!');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-6 shrink-0">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-slate-200"></div>
          <h1 className="font-bebas text-xl sm:text-2xl tracking-wider text-slate-900 mt-1">DESIGN STUDIO</h1>
        </div>
        <div className="flex items-center gap-1 sm:gap-3">
          <button 
            onClick={() => setShowPreview(true)}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-2 sm:px-3 py-2 rounded-md font-medium transition-colors flex items-center gap-2 text-sm"
          >
            <Eye className="w-4 h-4" /> <span className="hidden sm:inline">Preview</span>
          </button>
          <button 
            onClick={resetDesign}
            className="text-slate-500 hover:text-lime-500 font-medium px-2 sm:px-3 py-2 rounded-md transition-colors flex items-center gap-2 text-sm"
          >
            <RotateCcw className="w-4 h-4" /> <span className="hidden sm:inline">Reset</span>
          </button>
          <button 
            onClick={handleDownload}
            className="bg-slate-900 hover:bg-slate-800 text-white px-3 sm:px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2 text-sm"
          >
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Save Design</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden flex-col-reverse md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 z-20 h-1/2 md:h-auto border-t md:border-t-0 md:border-r">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            <button 
              onClick={() => setActiveTab('product')}
              className={`flex-1 py-4 text-sm font-medium flex flex-col items-center gap-1 transition-colors ${activeTab === 'product' ? 'text-lime-500 border-b-2 border-lime-500' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <Shirt className="w-5 h-5" /> Product
            </button>
            <button 
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-4 text-sm font-medium flex flex-col items-center gap-1 transition-colors ${activeTab === 'text' ? 'text-lime-500 border-b-2 border-lime-500' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <Type className="w-5 h-5" /> Text
            </button>
            <button 
              onClick={() => setActiveTab('logos')}
              className={`flex-1 py-4 text-sm font-medium flex flex-col items-center gap-1 transition-colors ${activeTab === 'logos' ? 'text-lime-500 border-b-2 border-lime-500' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <ImageIcon className="w-5 h-5" /> Logos
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* Product Tab */}
            {activeTab === 'product' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Select Product</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {(['tshirt', 'hoodie', 'jersey'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setClothingType(type)}
                        className={`py-3 px-2 rounded-md text-xs font-medium uppercase tracking-wide border transition-all ${clothingType === type ? 'border-lime-500 bg-lime-50 text-lime-600' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">View</h3>
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                      onClick={() => setView('front')}
                      className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${view === 'front' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Front
                    </button>
                    <button
                      onClick={() => setView('back')}
                      className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${view === 'back' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Back
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Color
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="color"
                      value={clothingColor}
                      onChange={(e) => setClothingColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                    />
                    <span className="text-sm text-slate-600 uppercase font-mono">{clothingColor}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {CLOTHING_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setClothingColor(color.value)}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${clothingColor === color.value ? 'border-lime-500 scale-110 shadow-md' : 'border-slate-200 hover:scale-105'}`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Text Tab */}
            {activeTab === 'text' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Text Content</label>
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => {
                      setTextInput(e.target.value);
                      updateSelectedText({ text: e.target.value });
                    }}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
                    placeholder="Enter text..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Font Style</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => {
                      setFontFamily(e.target.value);
                      updateSelectedText({ fontFamily: e.target.value });
                    }}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
                  >
                    {FONTS.map(font => (
                      <option key={font.value} value={font.value}>{font.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Text Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => {
                        setTextColor(e.target.value);
                        updateSelectedText({ fill: e.target.value });
                      }}
                      className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                    />
                    <span className="text-sm text-slate-600 uppercase font-mono">{textColor}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={addText}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Type className="w-4 h-4" /> Add Text to Design
                  </button>
                </div>

                {selectedId && elements.find(e => e.id === selectedId)?.type === 'text' && (
                  <div className="pt-4">
                    <button
                      onClick={deleteSelected}
                      className="w-full bg-lime-50 hover:bg-lime-100 text-lime-500 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Remove Selected Text
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Logos Tab */}
            {activeTab === 'logos' && (
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Choose a Graphic</h3>
                <div className="grid grid-cols-2 gap-4">
                  {LOGOS.map((logo) => (
                    <button
                      key={logo.id}
                      onClick={() => addLogo(logo.src)}
                      className="border border-slate-200 rounded-lg p-2 hover:border-lime-400 hover:shadow-md transition-all group relative bg-white"
                    >
                      <div className="aspect-square relative flex items-center justify-center bg-slate-50 rounded-md overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={logo.src} alt={logo.name} className="w-16 h-16 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-center mt-2 text-slate-600 font-medium">{logo.name}</p>
                    </button>
                  ))}
                </div>

                {selectedId && elements.find(e => e.id === selectedId)?.type === 'logo' && (
                  <div className="pt-6 border-t border-slate-200">
                    <button
                      onClick={deleteSelected}
                      className="w-full bg-lime-50 hover:bg-lime-100 text-lime-500 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Remove Selected Graphic
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 relative bg-slate-100 overflow-hidden flex flex-col">
          {/* Live Preview Indicator (Left) */}
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm shadow-sm border border-slate-200 rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse"></span>
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Live Preview</span>
          </div>

          {/* Clothing Info (Right) */}
          <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm shadow-sm border border-slate-200 rounded-full">
            <span className="text-[10px] font-medium text-slate-500 px-3 py-1.5">
              {clothingType.toUpperCase()} • {view.toUpperCase()}
            </span>
          </div>

          <DesignCanvas
            elements={elements}
            setElements={setElements}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            clothingType={clothingType}
            view={view}
            clothingColor={clothingColor}
          />

          {/* Instructions overlay */}
          {elements.length === 0 && showInstructions && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-auto">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200 flex items-center gap-3">
                <p className="text-slate-600 font-medium text-sm">
                  Select Text or Logos from the sidebar to start designing
                </p>
                <button 
                  onClick={() => setShowInstructions(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-full overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h2 className="font-bebas text-3xl tracking-wide text-slate-900">Design Preview</h2>
              <button onClick={() => setShowPreview(false)} className="text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 flex flex-col md:flex-row gap-8 items-center justify-center bg-slate-50 flex-1">
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-bold text-slate-700 uppercase tracking-wider">Front View</h3>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden w-[300px] h-[375px] md:w-[400px] md:h-[500px] relative">
                  <div className="absolute inset-0">
                    <DesignCanvas
                      elements={elements}
                      clothingType={clothingType}
                      view="front"
                      clothingColor={clothingColor}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <h3 className="font-bold text-slate-700 uppercase tracking-wider">Back View</h3>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden w-[300px] h-[375px] md:w-[400px] md:h-[500px] relative">
                  <div className="absolute inset-0">
                    <DesignCanvas
                      elements={elements}
                      clothingType={clothingType}
                      view="back"
                      clothingColor={clothingColor}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
