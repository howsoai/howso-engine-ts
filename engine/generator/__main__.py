import argparse
import json
import subprocess
import sys
import warnings

from .generator import generator


class Colors:
    OK = '\033[92m'
    FAIL = '\033[91m'
    END = '\033[0m'


def check_outdated():
    """Check for outdated howso packages."""
    proc = subprocess.run(
        ["pip", "list", "--outdated", "--format=json"],
        stdout=subprocess.PIPE)
    packages = json.loads(proc.stdout)
    is_outdated = False
    for package in packages:
        name = package.get("name")
        if name in ["amalgam-lang", "howso-engine"]:
            is_outdated = True
            version = package.get("version")
            latest_version = package.get("latest_version")
            warnings.warn(
                f"{name} at version {version} is outdated. Consider updating "
                f"to version {latest_version}.")
    return is_outdated


def entrypoint(arguments):
    """CLI entrypoint for trainee generator."""
    parser = argparse.ArgumentParser(description="Generate Playground Trainees")
    subparsers = parser.add_subparsers(dest="command")

    # Update engine flow
    subparsers.add_parser(
        "update",
        help="Update engine binaries from the installed python howso-engine.")

    args = parser.parse_args(arguments)

    if args.command == "list":
        generator.list()
        return

    if check_outdated() and not getattr(args, 'force', False):
        print(
            f"{Colors.FAIL}Stopping generation with outdated howso-engine. "
            f"Use --force to generate anyway.{Colors.END}")
        exit(1)

    generator.update()
    print(f"{Colors.OK}Engine camls updated{Colors.END}")


if __name__ == "__main__":
    entrypoint(sys.argv[1:])
