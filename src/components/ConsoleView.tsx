import React, {Component} from 'react';
import '../css/ConsoleView.css'

interface ConsoleViewProps {
    
}
interface ConsoleViewState {
    
}
class ConsoleView extends Component <ConsoleViewProps, ConsoleViewState>{
    public constructor(props : ConsoleViewProps) {
        super(props)
    }
    
    public render() : JSX.Element {
        return (
            <div className='console-view'>
                <div className='console-title'>控制面板</div>
                <div className='console-value'></div>
            </div>
        )
    }
}
export default ConsoleView;