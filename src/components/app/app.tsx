import { BrowserRouter as Router} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAvalaibleIngredients, getUser } from '../../services/actions';
import { ModalSwitch } from '../modal-switch/modal-switch';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
        dispatch(getAvalaibleIngredients());
    }, [])

    return (
        <Router>
            <ModalSwitch />
        </Router>
    );
}

export default App;
