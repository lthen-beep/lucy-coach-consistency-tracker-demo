'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Stethoscope, Shield } from 'lucide-react';

const roles = [
  { label: 'Cliente', href: '/cliente', icon: User },
  { label: 'Nutricionista', href: '/nutricionista', icon: Stethoscope },
  { label: 'Admin', href: '/admin', icon: Shield },
];

export default function RoleNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold text-stone-800 tracking-tight">Lucy Coach</span>
            <span className="text-xs text-stone-400 font-medium hidden sm:inline">Consistency Tracker</span>
          </Link>
          <div className="flex items-center gap-1">
            {roles.map((role) => {
              const isActive = pathname.startsWith(role.href);
              const Icon = role.icon;
              return (
                <Link
                  key={role.href}
                  href={role.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-stone-800 text-white'
                      : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <Icon size={15} />
                  <span className="hidden sm:inline">{role.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
