@echo off
title POSSE Portfolio - Poster Watcher (Auto-Push to GitHub)
echo Starting Poster Watcher with GitHub Auto-Push...
echo Whenever you drop images into 'Posters & graphic design',
echo they will be sorted (newest on top), optimized, and pushed to GitHub Pages!
echo.
python poster_sync.py --watch --push
pause

