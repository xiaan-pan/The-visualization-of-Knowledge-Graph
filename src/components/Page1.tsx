import React, {Component} from 'react';
import ConsoleView from './ConsoleView';
import TreeView from './TreeView';


interface Page1Props {
    
}
interface Page1State {
    
}
class Page1 extends Component <Page1Props, Page1State>{
    public constructor(props : Page1Props) {
        super(props)
    }
    
    public render() : JSX.Element {
        return (
            <React.Fragment>
                <div style={{
                    float: 'left',
                    width: '300px',
                    height: '804px',
                    marginLeft: '10px',
                    // backgroundColor: 'red'
                }}>
                    <ConsoleView />
                </div>
                <div style={{
                    float: 'left',
                    width: '900px',
                    height: '804px',
                    marginLeft: '10px',
                    // backgroundColor: 'red'
                }}>
                    <TreeView />
                </div>
                <div></div>
            </React.Fragment>

        )
    }
}
export default Page1;