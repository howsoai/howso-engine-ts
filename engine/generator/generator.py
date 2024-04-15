from importlib import import_module
from pathlib import Path
import shutil
from howso import engine

class Generator:
    """Utility to generate trainee camls for this package."""

    def __init__(self) -> None:
        self.scenarios = dict()
        self.base_dir = Path(__file__).parent.parent
        self.data_dir = Path(self.base_dir.parent, "src", "data")

    def update(self):
        """Copy binaries from python howso-engine to src/data."""
        binaries_dir = Path(
            Path(engine.__file__).parent, "..", "howso-engine").resolve()
        for file in binaries_dir.rglob("*.caml"):
            shutil.copy(file, Path(self.data_dir))
        shutil.copy(binaries_dir / "version.json", Path(self.data_dir))
        return
    
generator = Generator()
