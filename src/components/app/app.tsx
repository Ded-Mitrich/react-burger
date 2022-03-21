import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ModalSwitch } from '../modal-switch/modal-switch';
import moment from 'moment';
import 'moment/locale/ru';
import { getUser } from '../../services/actions/user-actions';
import { getAvalaibleIngredients } from '../../services/actions/ingredient-actions';
import { useAppDispatch } from '../../services/store';

function App() {
    const appDispatch = useAppDispatch();

    useEffect(() => {
        moment.locale('ru');
        appDispatch(getUser());
        appDispatch(getAvalaibleIngredients());
    }, [])

    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}

export default App;
