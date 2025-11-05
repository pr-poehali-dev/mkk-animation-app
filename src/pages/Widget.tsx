import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Widget = () => {
  const [loanAmount, setLoanAmount] = useState(15000);
  const [loanPeriod, setLoanPeriod] = useState(14);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

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

  if (showForm) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 animate-scale-in">
        <Card className="shadow-xl border-2">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Home" size={24} className="text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Анкета на займ</CardTitle>
                <p className="text-xs text-muted-foreground">Деньги в дом</p>
              </div>
            </div>
            <CardDescription>Заполните данные для получения займа</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="bg-muted rounded-lg p-4 space-y-1 text-sm">
                <p className="font-semibold">Параметры займа:</p>
                <p>Сумма: {loanAmount.toLocaleString('ru-RU')} ₽</p>
                <p>Срок: {loanPeriod} дней</p>
                <p>К возврату: {totalPayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</p>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 gap-2">
                  <Icon name="Send" size={18} />
                  Отправить
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Назад
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="shadow-xl border-2 animate-scale-in">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Home" size={24} className="text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Калькулятор займа</CardTitle>
              <p className="text-xs text-muted-foreground">Деньги в дом</p>
            </div>
          </div>
          <CardDescription>Рассчитайте стоимость займа онлайн</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Сумма займа</Label>
              <span className="text-2xl font-bold text-primary">{loanAmount.toLocaleString('ru-RU')} ₽</span>
            </div>
            <Slider
              value={[loanAmount]}
              onValueChange={(value) => setLoanAmount(value[0])}
              min={3000}
              max={30000}
              step={1000}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>3 000 ₽</span>
              <span>30 000 ₽</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Срок займа</Label>
              <span className="text-2xl font-bold text-secondary">{loanPeriod} дней</span>
            </div>
            <Slider
              value={[loanPeriod]}
              onValueChange={(value) => setLoanPeriod(value[0])}
              min={7}
              max={30}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>7 дней</span>
              <span>30 дней</span>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span>К возврату:</span>
              <span className="font-bold text-lg">{totalPayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Переплата:</span>
              <span>{overpayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</span>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full gap-2" 
            onClick={() => setShowForm(true)}
          >
            <Icon name="FileText" size={20} />
            Оформить заявку
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Процентная ставка 1% в день. Возраст от 18 лет.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Widget;
