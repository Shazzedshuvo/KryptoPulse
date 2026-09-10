import { ApiKeyManager } from '@/components/settings/ApiKeyManager';
import { Key } from 'lucide-react';

export default function ApiKeysPage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 select-none space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Key className="h-6 w-6 text-emerald-500" />
          Exchange API Keys Vault
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your exchange read + trade API credentials with AES-256 encryption. Zero withdrawal permissions allowed.
        </p>
      </div>

      <ApiKeyManager />
    </div>
  );
}
