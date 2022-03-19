import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAvalaibleIngredients, getUser } from '../../services/actions';
import { ModalSwitch } from '../modal-switch/modal-switch';
import moment from 'moment';
import 'moment/locale/ru';
import { openWsOrderFeedAll, openWsOrderFeedUser } from '../../services/actions/action-creators';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        moment.locale('ru');
        dispatch(getUser());
        dispatch(getAvalaibleIngredients());
        dispatch(openWsOrderFeedAll());
        dispatch(openWsOrderFeedUser());
    }, [])

    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}

export default App;
