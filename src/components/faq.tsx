import React from 'react';

export const FAQ: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12 md:py-16 border-t border-slate-100/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl my-8">
      <div className="text-center space-y-2 mb-12">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-400">
          Perguntas Frequentes
        </span>
        <h3 className="text-xl md:text-2xl font-black text-[#0F172A] dark:text-slate-100 tracking-tight">
          Como funciona o portal Komorebi?
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left">
        {[
          { icon: "*", color: "text-sky-500 dark:text-sky-400", title: "Onde faço o pagamento?", desc: "Nossos links te levam direto para os anúncios oficiais dentro da Shopee. Toda a transação, pagamento e a garantia da entrega são processados de forma segura pela própria plataforma da Shopee." },
          { icon: "*", color: "text-amber-500 dark:text-amber-400", title: "Posso pedir itens personalizados?", desc: "Sim! Se você busca um mimo exclusivo em pequenas quantidades, aceitamos encomendas. Entre em contato conosco pelas redes para consultar a agenda de produção." }
        ].map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <h4 className="text-xs font-bold font-mono text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className={item.color}>{item.icon}</span> {item.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-4">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};