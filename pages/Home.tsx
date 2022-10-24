import { FC, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';
import PizzaEmpty from '../components/PizzaEmpty';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/slices/filter/selectors';
import { selectPizzaData } from '../redux/slices/pizza/selectors';
import { SearchPizzaParams } from '../redux/slices/pizza/types';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/slice';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';

const Home:FC = ()  => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const sortType = sort.sortProperty;

  const getPizzas = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortby = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortby,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortby);
      dispatch(setFilters({
        searchValue: params.search,
        categoryId: Number(params.category),
        currentPage: Number(params.currentPage),
        sort: sort || sortList[0],
      }));
      isSearch.current = true;
    }
  }, []);

  
  useEffect(() => {
    if (isMounted.current) {
      const queryStrong = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryStrong}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);
  
  useEffect(() => {
  getPizzas()
  }, [categoryId, sortType, searchValue, currentPage]);

  const onChangeCategory = useCallback((i: number) => {
  dispatch(setCategoryId(i)) 
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <PizzaEmpty />
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : items.map((el: any) => <PizzaBlock key={el.id}  {...el} />)}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={(i) => dispatch(setCurrentPage(i))} />
    </div>
  );
}

export default Home
