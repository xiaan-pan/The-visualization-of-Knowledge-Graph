import React, {Component} from 'react';
import { InputNumber, Select, Button } from 'antd';
import 'antd/dist/antd.css';

import '../css/RadialTreeConsole.css'
import * as d3 from 'd3';


interface RadialTreeConsoleProps {
    selectNode: (name: string, nodeBySelect: string) => void,
    nameList: Array<string>,
    setSelectingName: (name:string) => void,
    showPath: () => void,
    hidePath: () => void,
}
interface RadialTreeConsoleState {
    isClick1: boolean,
    isClick2: boolean,
    nodeBySelect1: string,
    nodeBySelect2: string
}
class RadialTreeConsole extends Component <RadialTreeConsoleProps, RadialTreeConsoleState>{
    public constructor(props : RadialTreeConsoleProps) {
        super(props)
        this.state = {
            isClick1: false,
            isClick2: false,
            nodeBySelect1: 'no',
            nodeBySelect2: 'no'
        }
    }
    
    public render() : JSX.Element {
        const { Option } = Select;
        const { isClick1, isClick2, nodeBySelect1, nodeBySelect2 } = this.state
        const { nameList, setSelectingName, showPath, hidePath } = this.props
        return (
            <div className='radial-tree-console'>
                <div className='radial-tree-console-title'>控制台</div>
                <div className='radial-tree-console-value'>
                    <div className='line1' style={{
                        // backgroundColor:' red',
                        padding: '5px 20px'
                    }}>
                        <div style={{
                            width: '70px',
                            // paddingLeft: '20px',
                            lineHeight: '24px',
                            // fontSize: '15'
                            // height: '50px',
                            float: 'left',
                            // backgroundColor: 'red'
                        }}>
                            展示层数：
                        </div>
                        <InputNumber min={1} max={10} defaultValue={3} size='small'
                            style={{
                                width: '60px',
                                // lineHeight: '20px'
                                // height: '25px'
                                // padding: '2px'
                            }}
                            onChange={
                                () => {

                                }
                            } />
                    </div>
                    <div className="line3" style={{
                        width: '100%',
                        // paddingLeft: '20px',
                        padding: '5px 20px',
                        lineHeight: '24px',
                        height: '34px',
                        // backgroundColor: 'red'
                    }}>
                        <div style={{
                            width: '70px',
                            lineHeight: '24px',
                            float: 'left',
                        }}>
                            路径展示：
                        </div>
                        <Button type="primary" size='small' onClick={
                            () => {
                                showPath()
                            }
                        }>
                            显示路径
                        </Button>
                        <Button type="primary" size='small' style={{
                            marginLeft: '10px'
                        }} onClick={
                            () => {
                                hidePath()
                            }
                        }>
                            隐藏路径
                        </Button>

                    </div>
                    
                    <div className='line3' style={{
                        // backgroundColor: 'red',
                        padding: '5px 20px',
                        height: '34px'
                    }}>
                        <div style={{
                            width: '70px',
                            // paddingLeft: '20px',
                            lineHeight: '24px',
                            // marginTop: '10px',
                            float: 'left',
                            // backgroundColor: 'red'
                        }}>
                            节点一：
                        </div>
                        <Select
                            showSearch
                            style={{
                                width: '200px',
                                float: 'left',
                                // marginTop: '10px',
                            }}
                            size='small'
                            id='nodeBySelect1'
                            value={nodeBySelect1}
                            // placeholder="搜索一个节点"
                            onChange={
                                (value:string) => {
                                    this.setState({ nodeBySelect1: value })
                                    // console.log(value);
                                    this.props.selectNode('nodeBySelect1', value)
                                }
                            }
                            filterOption={
                                (input:string, option) => option!.value.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {
                                nameList.map((value: string, index: number) => (
                                    <Option value={value} key={'option1' + index}>{value}</Option>
                                ))
                            }
                        </Select>
                        <svg viewBox="0 0 1024 1024" width="24" height="24" style={{
                            marginLeft: '10px'
                        }} onMouseOver={//#1296db
                            () => {
                                d3.select('path#click1').attr('fill', isClick1 ? '#515151' : '#1296db')
                            }
                        } onMouseOut={
                            () => {
                                d3.select('path#click1').attr('fill', isClick1 ? '#1296db' : '#515151')
                            }
                        } onClick={
                            () => {
                                setSelectingName(!isClick1 ? 'nodeBySelect1' : 'no')
                                this.setState({isClick1: !isClick1, isClick2: false})
                                
                            }
                        }>
                            <path id='click1' d="M515.003915 6.313799c-280.19454 0-507.181251 227.057319-507.181251 507.182274s226.986711 507.181251 507.181251 507.181251c280.05537 0 507.183298-227.057319 507.183298-507.181251S795.059286 6.313799 515.003915 6.313799L515.003915 6.313799zM359.624079 538.119891c14.575973 22.35924 33.680077 39.270399 57.171094 50.519604l1.274016 82.359776c-22.783913-6.296403-43.585681-15.991206-62.97324-29.222555-19.246343-13.231349-35.944654-28.868491-49.953715-47.124274-14.009062-18.185174-25.048489-38.562271-32.972972-60.992119-7.924483-22.35924-11.886725-45.991474-11.886725-70.685899 0-29.717835 5.66093-57.80759 16.981766-84.199681 11.17962-26.39209 26.746154-49.459458 46.416146-69.12945 19.671015-19.671015 42.595121-35.236526 68.775386-46.558385 26.321482-11.320836 54.482869-16.910135 84.624353-16.910135 29.718859 0 57.879222 5.589298 84.201727 16.910135 26.320459 11.320836 49.386804 26.88737 68.774363 46.558385 19.527752 19.669992 34.95307 42.73736 46.27493 69.12945 11.320836 26.39209 16.981766 54.481845 16.981766 84.199681 0 18.467607-2.122337 35.378765-6.369058 50.873668l-71.03894-46.485731 0-4.387937c0-19.246343-3.53757-37.430494-10.897188-54.341652-7.357572-16.981766-17.405415-31.698956-29.859052-44.363394-12.594853-12.595876-27.311019-22.50148-44.011376-29.860075-16.838503-7.287987-34.811854-10.966773-54.057173-10.966773-19.24532 0-37.358863 3.679809-54.340629 10.966773-16.981766 7.358595-31.840172 17.264199-44.293809 29.860075-12.593829 12.664438-22.641673 27.381627-29.859052 44.363394-7.358595 16.911158-11.038404 35.095309-11.038404 54.341652C337.547271 490.64053 344.906889 515.618411 359.624079 538.119891L359.624079 538.119891zM729.821469 641.494283c-13.444197 0.848321-28.726252 2.406816-45.566802 4.669346-17.122983 2.335185-34.388205 5.802146-51.934836 10.400884l68.49193 113.139803c5.944386 11.320836 6.932899 23.278169 3.112897 35.802414-3.678786 12.594853-11.462053 21.793352-23.207561 27.665083-11.320836 6.29845-23.209608 7.429203-35.802414 3.467985-12.594853-4.03285-21.794375-11.675924-27.736715-22.925129l-57.171094-127.645169c-15.425318 9.270131-29.435403 18.962887-41.745776 29.222555-12.453636 10.330276-22.925129 19.812231-31.840172 28.656667-10.472516 10.401908-19.671015 20.945031-27.595498 31.414477l-1.838881-380.313795 317.414233 245.170862C760.106216 639.795595 745.245763 640.220267 729.821469 641.494283L729.821469 641.494283zM729.821469 641.494283" fill={ isClick1 ? '#1296db' : "#515151"}/>
                        </svg>
                    </div>
                    <div className='line4' style={{
                        // backgroundColor: 'red',
                        padding: '5px 20px',
                        height: '34px'
                    }}>
                        <div style={{
                            width: '70px',
                            // paddingLeft: '20px',
                            lineHeight: '24px',
                            // marginTop: '10px',
                            float: 'left',
                            // backgroundColor: 'red'
                        }}>
                            节点二：
                        </div>
                        <Select
                            showSearch
                            style={{
                                width: '200px',
                                float: 'left',
                                // marginTop: '10px',

                            }}
                            size='small'
                            value={nodeBySelect2}
                            onChange={
                                (value:string) => {
                                    this.setState({ nodeBySelect2: value })
                                    // console.log(value);
                                    this.props.selectNode('nodeBySelect2', value)

                                }
                            }
                            filterOption={
                                (input:string, option) => option!.value.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {
                                nameList.map((value: string, index: number) => (
                                    <Option value={value} key={'option2' + index}>{value}</Option>
                                ))
                            }
                        </Select>
                        <svg viewBox="0 0 1024 1024" width="24" height="24" style={{
                            marginLeft: '10px'
                        }} onMouseOver={//#1296db
                            () => {
                                d3.select('path#click2').attr('fill', isClick2 ? '#515151' : '#1296db')
                            }
                        } onMouseOut={
                            () => {
                                d3.select('path#click2').attr('fill', isClick2 ? '#1296db' : '#515151')
                            }
                        } onClick={
                            () => {
                                setSelectingName(!isClick2 ? 'nodeBySelect2' : 'no')
                                this.setState({isClick2: !isClick2, isClick1: false})
                            }
                        }>
                            <path id='click2' d="M515.003915 6.313799c-280.19454 0-507.181251 227.057319-507.181251 507.182274s226.986711 507.181251 507.181251 507.181251c280.05537 0 507.183298-227.057319 507.183298-507.181251S795.059286 6.313799 515.003915 6.313799L515.003915 6.313799zM359.624079 538.119891c14.575973 22.35924 33.680077 39.270399 57.171094 50.519604l1.274016 82.359776c-22.783913-6.296403-43.585681-15.991206-62.97324-29.222555-19.246343-13.231349-35.944654-28.868491-49.953715-47.124274-14.009062-18.185174-25.048489-38.562271-32.972972-60.992119-7.924483-22.35924-11.886725-45.991474-11.886725-70.685899 0-29.717835 5.66093-57.80759 16.981766-84.199681 11.17962-26.39209 26.746154-49.459458 46.416146-69.12945 19.671015-19.671015 42.595121-35.236526 68.775386-46.558385 26.321482-11.320836 54.482869-16.910135 84.624353-16.910135 29.718859 0 57.879222 5.589298 84.201727 16.910135 26.320459 11.320836 49.386804 26.88737 68.774363 46.558385 19.527752 19.669992 34.95307 42.73736 46.27493 69.12945 11.320836 26.39209 16.981766 54.481845 16.981766 84.199681 0 18.467607-2.122337 35.378765-6.369058 50.873668l-71.03894-46.485731 0-4.387937c0-19.246343-3.53757-37.430494-10.897188-54.341652-7.357572-16.981766-17.405415-31.698956-29.859052-44.363394-12.594853-12.595876-27.311019-22.50148-44.011376-29.860075-16.838503-7.287987-34.811854-10.966773-54.057173-10.966773-19.24532 0-37.358863 3.679809-54.340629 10.966773-16.981766 7.358595-31.840172 17.264199-44.293809 29.860075-12.593829 12.664438-22.641673 27.381627-29.859052 44.363394-7.358595 16.911158-11.038404 35.095309-11.038404 54.341652C337.547271 490.64053 344.906889 515.618411 359.624079 538.119891L359.624079 538.119891zM729.821469 641.494283c-13.444197 0.848321-28.726252 2.406816-45.566802 4.669346-17.122983 2.335185-34.388205 5.802146-51.934836 10.400884l68.49193 113.139803c5.944386 11.320836 6.932899 23.278169 3.112897 35.802414-3.678786 12.594853-11.462053 21.793352-23.207561 27.665083-11.320836 6.29845-23.209608 7.429203-35.802414 3.467985-12.594853-4.03285-21.794375-11.675924-27.736715-22.925129l-57.171094-127.645169c-15.425318 9.270131-29.435403 18.962887-41.745776 29.222555-12.453636 10.330276-22.925129 19.812231-31.840172 28.656667-10.472516 10.401908-19.671015 20.945031-27.595498 31.414477l-1.838881-380.313795 317.414233 245.170862C760.106216 639.795595 745.245763 640.220267 729.821469 641.494283L729.821469 641.494283zM729.821469 641.494283" fill={ isClick2 ? '#1296db' : "#515151"}/>
                        </svg>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default RadialTreeConsole;