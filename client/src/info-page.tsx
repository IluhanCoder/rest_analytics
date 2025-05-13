// WelcomePage.tsx
import React from 'react';

const InfoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-orange-700">Benvenuti a Tramonto</h1>
        <p className="text-lg mb-8">
          Ресторан <span className="font-semibold">Tramonto</span> — це місце, де італійська душа поєднується зі смаками сучасної кухні. 
          Ми пропонуємо автентичні пасти, піцу на дровах, свіжі салати, морепродукти та класичні десерти, натхненні рецептами з усього Середземномор'я.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <img src="https://panoramadeluxe.com/userfiles/image/gallery/restaurant_(1)_12.jpg" alt="Інтер'єр ресторану" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
          <img src="https://www.allrecipes.com/thmb/IrY572TXic4UXXVn8EetsarI3S0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-269500-creamy-garlic-pasta-Beauties-4x3-f404628aad2a435a9985b2cf764209b5.jpg" alt="Свіжа паста" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
          <img src="https://assets.surlatable.com/m/15a89c2d9c6c1345/72_dpi_webp-REC-283110_Pizza.jpg" alt="Піца на дровах" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-600">Про нас</h2>
          <p className="mb-4">
            У самому серці міста, <span className="font-semibold">Tramonto</span> створено для тих, хто любить затишок, гарну музику та справжню їжу. 
            Увечері наш ресторан перетворюється на теплий оазис з вогниками, ароматами базиліку і сміхом гостей.
          </p>
          <p>
            Ми не женемося за модою — ми створюємо атмосферу. 
            Заходьте на келих італійського вина, залишайтеся на вечерю, і обов’язково спробуйте наш домашній тірамісу.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
