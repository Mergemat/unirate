import { Link } from "next-view-transitions";
import { Button } from "~/components/ui/button";

export default async function Home() {
  return (
    <div className="hero h-full">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-6xl font-bold">Добро пожаловать!</h1>
          <p className="py-6 text-lg">
            UniRate - это платформа для отслеживания рейтинга университетов
            Дагестана. Нажмите на кнопку ниже чтобы начать.
          </p>
          <Button size="lg" asChild>
            <Link href="/uni">Перейти к рейтингу</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
