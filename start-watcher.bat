@echo off
title POSSE Portfolio - Poster Watcher
echo Starting Poster Watcher...
echo Whenever you drop images into 'Posters & graphic design',
echo they will be automatically sorted (newest on top) and optimized.
echo.
python poster_sync.py --watch
pause

