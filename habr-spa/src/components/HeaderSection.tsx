import React from 'react';

const navItems = ["О нас", "Лента", "Блоги", "Мои файлы"];

export const HeaderSection = () => (
  <header className="flex w-full max-w-[1440px] mx-auto items-center justify-between px-4 py-2.5 fixed top-0 left-0 z-50 bg-[#f6f6f6]">
    <div className="flex items-center gap-12">
      <div className="font-semibold text-black text-[32px]">Fidd</div>
      <nav className="flex items-center gap-6">
        {navItems.map((item, index) => (
          <a key={index} href="#" className="font-normal text-base text-black no-underline px-2 py-1 hover:bg-[#eaeaea] rounded-[6px]">{item}</a>
        ))}
      </nav>
    </div>
    <div className="flex items-center gap-4">
      <button className="inline-flex items-center justify-center gap-2.5 px-4 py-2 bg-[#eeeeee] rounded-[10px] border-none cursor-pointer">
        <span className="font-normal text-base text-black">Создать блог</span>
      </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-[10px] text-base font-medium hover:bg-blue-600">Войти</button>
      {/* аватар или иконка */}
    </div>
  </header>
);

export default HeaderSection;
