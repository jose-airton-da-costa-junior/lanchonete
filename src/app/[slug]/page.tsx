import { db } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProp {
  params: Promise<{ slug: string }>;
}

const RestaurentPage = async ({ params }: RestaurantPageProp) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        {/* TÍTULO: Exibe o nome do restaurante dinamicamente */}
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>

      <div className="pt-24 text-center space-y-2">
        {/* BEM-VINDO: Mensagem de recepção para o cliente */}
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Oferecemos praticidade e
          sabor em cada detalhe!
        </p>
      </div>

      {/* OPÇÕES DE CONSUMO: Grid contendo as modalidades de pedido */}
      <div className="pt-14 grid grid-cols-2 gap-4">
        <ConsumptionMethodOption
          slug={slug}
          option="DINE_IN"
          buttonText="Para comer aqui"
          imageAlt="Comer no local"
          imageUrl="/dine_in.png" // Certifique-se de ter essa imagem na pasta /public
        />
        <ConsumptionMethodOption
          slug={slug}
          option="TAKEAWAY"
          buttonText="Para levar"
          imageAlt="Retirada para levar"
          imageUrl="/takeaway.png" // Certifique-se de ter essa imagem na pasta /public
        />
      </div>
    </div>
  );
};

export default RestaurentPage;
