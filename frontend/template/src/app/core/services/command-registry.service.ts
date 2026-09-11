import { Injectable, signal } from '@angular/core';

export interface CommandItem {
  id: string;
  label: string;
  category?: string;
  shortcut?: string;
  icon?: string;
  action: () => void;
}

@Injectable({ providedIn: 'root' })
export class CommandRegistryService {
  readonly commands = signal<CommandItem[]>([]);
  readonly isPaletteOpen = signal<boolean>(false);

  registerCommand(command: CommandItem): void {
    this.commands.update((items) => {
      const filtered = items.filter((i) => i.id !== command.id);
      return [...filtered, command];
    });
  }

  unregisterCommand(id: string): void {
    this.commands.update((items) => items.filter((i) => i.id !== id));
  }

  togglePalette(): void {
    this.isPaletteOpen.update((open) => !open);
  }

  closePalette(): void {
    this.isPaletteOpen.set(false);
  }

  searchCommands(query: string): CommandItem[] {
    const q = query.trim().toLowerCase();
    if (!q) return this.commands();
    return this.commands().filter((cmd) =>
      cmd.label.toLowerCase().includes(q) || (cmd.category && cmd.category.toLowerCase().includes(q))
    );
  }

  executeCommand(id: string): void {
    const cmd = this.commands().find((c) => c.id === id);
    if (cmd) {
      cmd.action();
      this.closePalette();
    }
  }
}
