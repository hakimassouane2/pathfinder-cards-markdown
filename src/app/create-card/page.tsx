"use client";

import CardEdit from "@/components/CardEdit/CardEdit";
import { emptyCard } from "@/data/emptyCard";

export default function CreateCard() {
  return <CardEdit initialCard={emptyCard} cardIndex={null} />;
}
