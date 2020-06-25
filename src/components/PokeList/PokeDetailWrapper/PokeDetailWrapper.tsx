import React from 'react';
// import styles from './PokeDetailWrapper.module.css';
import APIPokemon from '../../../API/APIPokemon';
import PokeDetail from './PokeDetail/PokeDetail';
import {TPokeDetail} from './TPokeDetail';

type Props = {}
type State = {
    details: TPokeDetail,
    loaded: boolean
}

class PokeDetailWrapper extends React.Component<Props,State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            details: {
                name: '',
                order: 0,
                sprites:{},
                types: [],
                abilities: [],
                stats: [],
                moves: [],
                evolutions:{chain:{species:{name:''}, evolves_to:[]}}
            },
            loaded: false
        };
    }

    async componentDidMount() {
        let details = await APIPokemon.getOne('https://pokeapi.co/api/v2/pokemon/1/');
        details.evolutions = await APIPokemon.getEvolutions(1);
        
        this.setState({details, loaded:true});
    }

    render() {
        const { details } = this.state;
        return (
                this.state.loaded?
                < PokeDetail
                {...details}
                    />
                    :null
        );
    }
}
export default PokeDetailWrapper;