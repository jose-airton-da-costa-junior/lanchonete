"use client";

import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();

  return (
    <div className="relative h-[250px] w-full">
      {/* Botão Voltar */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 left-4 rounded-full z-50"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>

      <Image
        src={restaurant.coverImageUrl}
        fill
        className="object-cover"
        alt={restaurant.name}
        priority // Adicionado para carregar a imagem de capa mais rápido (LCP)
      />

      {/* Botão de Histórico/Pedidos */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 rounded-full z-50"
        onClick={() => router.push("/orders")} // Altere a rota conforme a sua estrutura de páginas
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default RestaurantHeader;
