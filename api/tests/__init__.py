"""
Testes Package
"""

import sys
from pathlib import Path

# Adiciona diretório pai ao path para imports
api_dir = Path(__file__).parent.parent
sys.path.insert(0, str(api_dir))
