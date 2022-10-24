import '../../scss/app.scss';

export default function PizzaEmpty() {
  return (
    <div className="content__error-info">
      <h2>Произошла ошибка 😕</h2>
      <p>К сожалениюб не удалось получить данные. Попробуйте повторить попытку позже...</p>
    </div>
  );
}
