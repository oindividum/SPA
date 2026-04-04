import React from 'react';

export const SidebarSection = () => (
  <aside className="w-[240px] shrink-0 bg-white rounded-[10px] p-4 flex flex-col gap-6">
    <div className="flex items-center gap-2 mb-2">
      <span className="font-semibold text-lg">Мой профиль</span>
      <button className="ml-auto bg-[#f6f6f6] rounded-full p-2">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </button>
    </div>
    <div className="font-normal text-base text-black mb-2">Фильтр ленты</div>
    <div className="flex flex-col gap-2">
      <button className="flex items-center gap-2 bg-[#e2e2e2] rounded-[10px] p-2 text-base">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4"/></svg>
        Все посты
      </button>
      <button className="flex items-center gap-2 bg-white rounded-[10px] p-2 text-base">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        Доступные мне
      </button>
      <button className="flex items-center gap-2 bg-white rounded-[10px] p-2 text-base">
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        Только купленные
      </button>
    </div>
  </aside>
);

export default SidebarSection;
