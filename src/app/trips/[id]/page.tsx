import { TripPage } from "@/sections/trip";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Страница маршрута ${id}  | Next Go`,
  }
}

export default async function TripById({ params }: PageProps) {
  const { id } = await params
  return <TripPage id={id} />
}
