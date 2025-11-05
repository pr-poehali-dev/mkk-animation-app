import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loanAmount, setLoanAmount] = useState(15000);
  const [loanPeriod, setLoanPeriod] = useState(14);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const calculateLoan = () => {
    const dailyRate = 0.01;
    const totalPayment = loanAmount * (1 + dailyRate * loanPeriod);
    const overpayment = totalPayment - loanAmount;
    return { totalPayment, overpayment };
  };

  const { totalPayment, overpayment } = calculateLoan();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      amount: loanAmount,
      period: loanPeriod
    };
    console.log('Заявка отправлена:', data);
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="animate-pulse-slow">
          <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shadow-2xl mb-6 animate-scale-in">
            <Icon name="Home" size={48} className="text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-primary animate-fade-in">Деньги в дом</h1>
        <p className="text-muted-foreground mt-2 animate-fade-in">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Home" size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold">Деньги в дом</span>
          </div>
          <Button size="sm" className="gap-2">
            <Icon name="Download" size={16} />
            Скачать приложение
          </Button>
        </div>
      </header>

      <main className="container py-12 space-y-16 animate-fade-in">
        <section className="text-center space-y-4 py-12 animate-slide-up">
          <h1 className="text-5xl font-bold tracking-tight">
            Быстрые займы<br />
            <span className="text-primary">до 30 000 ₽</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Получите деньги на карту за 15 минут. Без справок и поручителей.
          </p>
        </section>

        <section id="calculator" className="max-w-3xl mx-auto">
          <Card className="shadow-xl border-2 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Icon name="Calculator" size={32} className="text-primary" />
                Калькулятор займа
              </CardTitle>
              <CardDescription>Рассчитайте стоимость займа онлайн</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg">Сумма займа</Label>
                  <span className="text-3xl font-bold text-primary">{loanAmount.toLocaleString('ru-RU')} ₽</span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  min={3000}
                  max={30000}
                  step={1000}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>3 000 ₽</span>
                  <span>30 000 ₽</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg">Срок займа</Label>
                  <span className="text-3xl font-bold text-secondary">{loanPeriod} дней</span>
                </div>
                <Slider
                  value={[loanPeriod]}
                  onValueChange={(value) => setLoanPeriod(value[0])}
                  min={7}
                  max={30}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>7 дней</span>
                  <span>30 дней</span>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-6 space-y-3">
                <div className="flex justify-between text-lg">
                  <span>К возврату:</span>
                  <span className="font-bold">{totalPayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Переплата:</span>
                  <span>{overpayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full text-lg h-14 gap-2" 
                onClick={() => setShowForm(true)}
              >
                <Icon name="FileText" size={20} />
                Оформить заявку
              </Button>
            </CardContent>
          </Card>
        </section>

        {showForm && (
          <section className="max-w-2xl mx-auto animate-scale-in">
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Анкета на займ</CardTitle>
                <CardDescription>Заполните данные для получения займа</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">ФИО</Label>
                    <Input id="name" name="name" placeholder="Иванов Иван Иванович" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passport">Серия и номер паспорта</Label>
                    <Input id="passport" name="passport" placeholder="0000 000000" required />
                  </div>
                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    <p className="font-semibold">Параметры займа:</p>
                    <p>Сумма: {loanAmount.toLocaleString('ru-RU')} ₽</p>
                    <p>Срок: {loanPeriod} дней</p>
                    <p>К возврату: {totalPayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</p>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 gap-2">
                      <Icon name="Send" size={18} />
                      Отправить заявку
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Отмена
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>
        )}

        <section className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center">Условия получения займа</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="UserCheck" size={32} className="text-primary" />
                </div>
                <CardTitle>От 18 лет</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Гражданство РФ и постоянная регистрация</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" size={32} className="text-secondary" />
                </div>
                <CardTitle>15 минут</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Быстрое рассмотрение заявки без визита в офис</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CreditCard" size={32} className="text-accent" />
                </div>
                <CardTitle>На карту</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Моментальное зачисление на любую карту</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center">Часто задаваемые вопросы</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">Какие документы нужны для получения займа?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Для оформления займа необходим только паспорт гражданина РФ. Никаких справок о доходах и поручителей не требуется.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">Как быстро приходят деньги?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                После одобрения заявки деньги поступают на вашу карту в течение 15 минут. В редких случаях перевод может занять до 24 часов.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">Можно ли продлить займ?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, вы можете продлить займ на срок до 30 дней. Для этого обратитесь в службу поддержки за 1-2 дня до окончания срока займа.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">Что будет, если не вернуть займ вовремя?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                При просрочке начисляется пени 0,1% в день от суммы долга. Мы рекомендуем связаться с нами заранее для обсуждения возможности реструктуризации.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-primary to-secondary text-white shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Скачайте наше приложение</CardTitle>
              <CardDescription className="text-white/80">
                Управляйте займами ещё удобнее с мобильным приложением
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="gap-2">
                  <Icon name="Smartphone" size={20} />
                  App Store
                </Button>
                <Button variant="secondary" size="lg" className="gap-2">
                  <Icon name="PlayCircle" size={20} />
                  Google Play
                </Button>
              </div>
              <p className="text-center text-sm text-white/70">
                Или откройте на мобильном: https://www.money-financei.ru/theapplicationisoffline
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center">Контактная информация</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Phone" size={24} className="text-primary" />
                  Телефон
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:88001234567" className="text-xl font-semibold hover:text-primary transition-colors">
                  8 (800) 123-45-67
                </a>
                <p className="text-sm text-muted-foreground mt-1">Звонок бесплатный, 24/7</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Mail" size={24} className="text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:info@money-financei.ru" className="text-xl font-semibold hover:text-primary transition-colors">
                  info@money-financei.ru
                </a>
                <p className="text-sm text-muted-foreground mt-1">Ответим в течение часа</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t mt-16 py-8 bg-muted/30">
        <div className="container text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Home" size={18} className="text-white" />
            </div>
            <span className="font-bold">Деньги в дом</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 МКК "Деньги в дом". Все права защищены.
          </p>
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            Услуги предоставляются ООО МКК "Деньги в дом". Процентная ставка от 1% в день. Максимальная сумма займа 30 000 ₽.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
