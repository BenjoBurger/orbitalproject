import { Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function InvisText({text, colour, size, disabled}){
    if (!disabled){
        return (
            <Text style = {[globalStyles.appBodyFont, {fontSize: size, color: colour}]}> {text} </Text>
        )
    }
}