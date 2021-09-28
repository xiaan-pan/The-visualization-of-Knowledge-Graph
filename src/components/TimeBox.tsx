import React, {Component} from 'react';

interface TimeBoxProps {
    
}
interface TimeBoxState {
    
}
class TimeBox extends Component <TimeBoxProps, TimeBoxState>{
    public constructor(props : TimeBoxProps) {
        super(props)
    }
    
    public render() : JSX.Element {

        return (
            <div className="time" id='showTime' >2018/6/12 17:00:12</div>
        )
    }

    public componentDidMount() {
        setInterval(() => {
            const dt: Date = new Date();
            const y: number = dt.getFullYear();
            const mt: number = dt.getMonth() + 1;
            const day: number = dt.getDate();
            const h: number = dt.getHours(); //获取时
            const m: number = dt.getMinutes(); //获取分
            const s: number = dt.getSeconds(); //获取秒
            document.getElementById("showTime")!.innerHTML = y + "/" + mt + "/" + day + " " + h + ":" + m + ":" + s + "";
        }, 1000)
    }

}
export default TimeBox;