import { pce } from "~/pce";
import type { Route } from "./+types/home";
import Game from "~/components/game";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Spendle" }];
}

export function findCategories() {
  const data = pce;

  const buckets: Record<number, string[]> = {};

  for (const [key, value] of Object.entries(data)) {
    const bucket = Math.floor(Math.log(value) / Math.log(1.1));
    if (!buckets[bucket]) {
      buckets[bucket] = [];
    }
    buckets[bucket].push(key);
  }
  const bucketsArray = Object.values(buckets).filter(
    (bucket) => bucket.length > 2
  );

  const categories: string[][] = [];
  const bucketIndices: number[] = [];

  while (categories.length < 3) {
    const randomBucket = Math.floor(Math.random() * bucketsArray.length);
    if (bucketIndices.some((index) => Math.abs(index - randomBucket) <= 1)) {
      continue;
    }
    categories.push(bucketsArray[randomBucket]);
    bucketIndices.push(randomBucket);
  }

  const categoriesOf3 = categories.map((category) => category.slice(0, 3));
  console.log(categoriesOf3);

  return categoriesOf3;
}

export function clientLoader() {
  return findCategories();
}

export default function Home() {
  const categories = useLoaderData<typeof clientLoader>();

  return <Game categories={categories} />;
}
