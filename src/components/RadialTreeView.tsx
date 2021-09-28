import axios, { AxiosResponse } from 'axios';
import React, {Component} from 'react';
import * as d3 from 'd3'
// import $ from 'jquery'

import '../css/RadialTreeView.css'
import RadialTreeConsole from './RadialTreeConsole';

interface RadialTreeViewProps {
    
}
interface RadialTreeViewState {
    treeData:d3.HierarchyPointNode<any> | null,
    nodeBySelect1: string,
    nodeBySelect2: string,
    nameList: Array<string>,
    showTextList: Array<string[]>,
    pathNode: Array<string>,
    zoom: number,
    // offsetX: number,
    // offsetY: number,
    // treeDataHaveXY:d3.HierarchyPointNode<any> | null
}
class RadialTreeView extends Component <RadialTreeViewProps, RadialTreeViewState>{
    private tree:d3.ClusterLayout<any>
    private linkRadial:d3.LinkRadial<any, d3.DefaultLinkObject, [number, number]>
    private circleIsShow: Array<string>
    private selectingName:string
    private isDraging: boolean
    private startX: number
    private startY: number
    private offsetX: number
    private offsetY: number
    public constructor(props : RadialTreeViewProps) {
        super(props)
        this.tree = d3.cluster().size([2 * Math.PI, 550 / 2])
        this.linkRadial = d3.linkRadial().angle(d => (d as any).x).radius(d => (d as any).y)
        this.circleIsShow = ['no']
        this.selectingName = 'no'
        this.isDraging = false
        this.startX = 0
        this.startY = 0
        this.offsetX = 0
        this.offsetY = 0
        this.state = {
            treeData: null,
            nodeBySelect1: '',
            nodeBySelect2: '',
            nameList: ['no'],
            showTextList: [],
            pathNode: [],
            zoom: 1,
            // offsetX: 0,
            // offsetY: 0,
            // treeDataHaveXY: null
        }
    }
    
    public render() : JSX.Element {
        const { treeData, nameList, showTextList, pathNode, zoom } = this.state
        const height = 690
        const width = 820
        return (
            <React.Fragment>
            <div className='tree-view'>
                <div className="tree-title">
                    径向树图
                </div>
                <div className="tree-value" id='tree-value'>
                    <svg id='tree' width='100%' height='100%' style={{
                        // backgroundColor: 'red'
                        zoom,
                        // transform: `translate(${offsetX}px, ${offsetX}px)`,
                        // transform: `translate(${0}px, ${100}px)`

                    }} onMouseDown={
                        (e) => {
                            // console.log(e)
                            this.startX = e.clientX
                            this.startY = e.clientY
                            const svg = d3.select('svg#tree')
                            const transform = svg.selectAll('g').attr('transform')
                            this.offsetX = parseInt(transform.split(',')[0].split('(')[1])
                            this.offsetY = parseInt(transform.split(',')[1].split(')')[0])
                            this.isDraging = true
                            
                        }
                    } onMouseMove={
                        (e) => {
                            if (this.isDraging) {

                                // const transform = d3.select('svg#tree').selectAll('path.edges').attr('transform')
                                const offsetX = this.offsetX  + e.clientX - this.startX
                                const offsetY = this.offsetY + e.clientY - this.startY
                                d3.select('svg#tree').selectAll('g').attr('transform', `translate(${offsetX}, ${offsetY})`)

                            }
                            
                        }
                    } onMouseUp={
                        (e) => {
                            this.isDraging = false
                            this.offsetX = e.clientX - this.startX
                            this.offsetY = e.clientY - this.startY
                            // console.log(offsetX, offsetY)
                        }
                    }>
                        <g transform={`translate(${width / 2}, ${height / 2}) `}>
                            {
                                treeData !== null && treeData.links().map((value: d3.HierarchyLink<any>, index: number) => (
                                    <path d={this.linkRadial(value as any) as string} key={'path' + index} className='edges'
                                        // transform={'translate(' + width / 2 + ',' + height / 2 + ')'}
                                        style={{
                                            stroke: pathNode.includes(value['target']['data']['kks码']) && pathNode.includes(value['source']['data']['kks码']) ? '#1296db' : '#555',
                                            fill: 'none',
                                            strokeWidth: pathNode.includes(value['target']['data']['kks码']) && pathNode.includes(value['source']['data']['kks码']) ? '3px' : '1.5px',
                                            // transform: 'translate(' + width / 2 + ',' + width / 2 + ')'
                                        }}/>
                                )) 
                            }
                        </g>
                        
                        <g transform={`translate(${width / 2}, ${height / 2}) `}>
                            {
                                treeData !== null && treeData.descendants().map((value: d3.HierarchyPointNode<any>, index: number) => (
                                    <circle r='3px' fill={'white'} key={'circle' + index} id={'circle' + index} className='nodes'
                                        transform={`rotate(${value.x * 180 / Math.PI - 90}) translate(${value.y}, 0)`}
                                        stroke={this.setCircleColor(value)} strokeWidth='2px'
                                        onClick={
                                            () => {
                                                if (this.selectingName !== 'no') {
                                                    this.setState({ [this.selectingName as 'nodeBySelect1'] : value['data']['kks码'] })
                                                    // $('#' + this.selectingName).val(value['data']['kks码'])
                                                    ;(this.refs['RadialTreeConsole'] as RadialTreeConsole).setState({ [this.selectingName as 'nodeBySelect1'] : value['data']['kks码'] })
                                                    return
                                                }
                                                console.log(value)
                                                // console.log(this.circleIsShow.length);
                                                value['data']['children']?.forEach((v: any) => {
                                                    this.circleIsShow.push(v['kks码'])
                                                    // console.log(v['kks码']);
                                                })
                                                // this.circleIsShow.push(value['data']['kks码'])
                                                // console.log(this.circleIsShow.length);

                                                this.changeTree()
                                                // console.log(value.ancestors());
                                                
                                                // console.log(this.tree(value));
                                                // value['children'] = JSON.parse(JSON.stringify(value['data']['children']))
                                                
                                                // const data = d3.hierarchy(treeData).sort((a, b) => d3.ascending((a.data as any).name, (b.data as any).name))
                                                // this.setState({ treeData: this.tree(data) })
                                            }
                                        }
                                        onMouseOver={
                                            (e:React.MouseEvent<SVGCircleElement, MouseEvent>) => {
                                                d3.select('circle#circle' + index).attr('r', 5)
                                                const showTextList:Array<string[]> = [
                                                    ['kks码', value['data']['kks码']],
                                                    ['name', value['data']['name']],
                                                    ['设备类编码', value['data']['设备类编码']],
                                                    ['资产类型', value['data']['资产类型']],
                                                    ['资产编码', value['data']['资产编码']]
                                                ]
                                                this.setState({ showTextList }, () => {
                                                    d3.select('div#showBox')
                                                        .style('display', 'block')
                                                        .style('left', e.clientX + 10 + 'px')
                                                        .style('top', e.clientY + 10 + 'px')
                                                })
                                            }
                                        }
                                        onMouseOut={
                                            () => {
                                                d3.select('circle#circle' + index).attr('r', 3)
                                                d3.select('div#showBox')
                                                    .style('display', 'none')
                                            }
                                        }
                                    />
                                )) 
                            }
                        </g>
                        <g transform={`translate(${width / 2}, ${height / 2}) `}>
                            {
                                treeData !== null && treeData.descendants().map((value: d3.HierarchyPointNode<any>, index: number) => {
                                    // console.log(value['data'].children);
                                    return (
                                    <text fill={value['data'].children ? '#555' : '#999'} key={'text' + index}
                                        fontSize='10px'
                                        dy={'0.31em'}
                                        strokeWidth='3px'
                                        // fontFamily='sans-serif'
                                        transform={`rotate(${value.x * 180 / Math.PI - 90}) translate(${value.y}, 0) rotate(${value.x >= Math.PI ? 180 : 0})`}
                                        x={(value.x < Math.PI) === (!value.children) ? 6 : -53}
                                    >
                                        { 
                                            (value as any).data.name.length > 4 ?
                                            (value as any).data.name.slice(0, 4) + '···' : 
                                            (value as any).data.name
                                        }
                                    </text>
                                )}) 
                                    
                            }
                        </g>
                    </svg>
                    {/* 放大 */}
                    <svg viewBox="0 0 1024 1024" width="24" height="24" style={{
                        position: 'absolute',
                        top: 0,
                        right: 10
                    }} onClick={
                        () => {
                            this.setState({ zoom: zoom + 0.1 })
                        }
                    }>
                        <path className='zoom-out' d="M512 0a512 512 0 1 1 0 1024A512 512 0 0 1 512 0z m0 213.357714a42.642286 42.642286 0 0 0-42.642286 42.642286l-0.073143 213.284571H256c-21.211429 0-38.765714 15.506286-42.130286 35.84L213.357714 512c0 23.552 19.017143 42.642286 42.642286 42.642286h213.284571V768c0 21.211429 15.506286 38.765714 35.84 42.130286l6.875429 0.512a42.642286 42.642286 0 0 0 42.642286-42.642286V554.642286H768c21.211429 0 38.765714-15.433143 42.130286-35.693715L810.642286 512a42.642286 42.642286 0 0 0-42.642286-42.642286l-213.357714-0.073143V256c0-21.211429-15.433143-38.765714-35.693715-42.130286z" fill="#515151"/>
                    </svg>
                    {/* 缩小 */}
                    <svg viewBox="0 0 1024 1024"  width="24" height="24" style={{
                        position: 'absolute',
                        top: 34,
                        right: 10
                    }} onClick={
                        () => {
                            // if 
                            this.setState({ zoom: zoom - 0.1 })
                        }
                    }>
                        <path className='zoom-in' d="M509.6448 0c281.472 0 509.6448 228.0704 509.6448 509.3888 0 281.344-228.1728 509.3888-509.6448 509.3888C228.1728 1018.7776 0 790.7328 0 509.3888S228.1728 0 509.6448 0z m233.5744 466.944H276.0448a42.4704 42.4704 0 1 0 0 84.8896h467.2a42.4704 42.4704 0 1 0 0-84.8896z" fill="#515151"/>
                    </svg>
                    {/* 定位中心 */}
                    <svg viewBox="0 0 1024 1024"  width="24" height="24"style={{
                        position: 'absolute',
                        top: 64,
                        right: 10
                    }} onClick={
                        () => {
                            d3.select('svg#tree').selectAll('g').attr('transform', `translate(${width / 2 / zoom}, ${height / 2 / zoom})`)
                        }
                    }>
                        <path className='locate-center' d="M511.979435 0A511.979435 511.979435 0 1 1 0 511.979435 511.979435 511.979435 0 0 1 511.979435 0z" fill="#515151" />
                        <path d="M257.223601 486.314656a256.071977 256.071977 0 0 1 229.132185-229.132184V204.783548h51.206169v52.398924a256.071977 256.071977 0 0 1 229.091055 229.132184h52.481183v51.20617h-52.440053a256.071977 256.071977 0 0 1-229.173314 229.091055v52.481182h-51.20617v-52.398923a256.071977 256.071977 0 0 1-229.091055-229.132185H204.783548v-51.206169h52.481183z m254.755834 185.576094a159.952444 159.952444 0 1 0-159.993573-159.952444 159.993574 159.993574 0 0 0 159.952444 159.952444z m0-89.57995a70.372495 70.372495 0 1 0-70.372494-70.372494 70.372495 70.372495 0 0 0 70.331365 70.372494z" fill="#FFFFFF" />
                    </svg>
                    {/* 恢复 */}
                    <svg  viewBox="0 0 1050 1024" width="24" height="24"style={{
                        position: 'absolute',
                        top: 96,
                        right: 10
                    }} onClick={
                        () => {
                            this.setState({ zoom: 1 })
                            d3.select('svg#tree').selectAll('g').attr('transform', `translate(${width / 2}, ${height / 2})`)
                        }
                    }>
                        <path className='reset' d="M525.473684 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#515151" />
                        <path d="M429.864421 395.425684a158.127158 158.127158 0 0 1 211.348211-7.033263c61.332211 51.712 79.494737 143.36 38.588631 213.854316-31.797895 58.745263-95.447579 91.648-161.333895 82.243368-65.886316-9.404632-118.164211-56.400842-136.353684-122.206316-4.527158-18.782316-22.689684-28.186947-40.906105-23.471157-18.162526 4.688842-27.243789 23.471158-22.689684 42.280421 36.325053 124.550737 161.333895 195.045053 279.471158 159.797894 120.481684-35.247158 190.922105-164.513684 156.833684-289.064421-22.258526-79.413895-82.297263-141.473684-159.070316-164.486737-77.258105-23.498105-159.070316 0-215.875368 56.400843l-43.169685-44.678737a17.273263 17.273263 0 0 0-18.162526-4.688842c-2.290526 7.060211-6.844632 11.749053-6.844631 18.809263v145.704421c0 9.377684 6.844632 16.437895 15.925894 16.437895h138.617263c6.790737 0 13.635368-4.688842 15.898948-9.404632 2.263579-4.688842 0-14.093474-4.581053-18.782316l-47.696842-51.712z" fill="#FFFFFF" />
                    </svg>
                </div>
            </div>
            <div id='showBox' style={{
                position: 'absolute',
                width: '225px',
                // height: '100px',
                // top: 150,
                display: 'none',
                backgroundColor: 'white',
                border: '1px solid rgb(176,196,222)',
                borderRadius: '5px',
                boxShadow: '0 0 1px #4E4E4E'
            }}>
                {
                    showTextList.map((valueArr: string[], index: number) => (
                        <div key={'tooltip' + index} style={{
                            width: '100%',
                            height: '30px',
                        }}>
                            <div style={{
                                width: '100px',
                                height: '100%',
                                // backgroundColor: 'red',
                                lineHeight: '30px',
                                paddingLeft: '10px',
                                display: 'inline-block',
                                color: '#999'
                            }}>
                                {valueArr[0]}
                            </div>
                            <div style={{
                                width: '123px',
                                height: '100%',
                                // backgroundColor: 'blue',
                                lineHeight: '30px',
                                display: 'inline-block',
                                color: '#555',
                                fontWeight: 'bold'
                            }}>
                                {valueArr[1]}
                            </div>
                        </div>
                    ))
                }
                
            </div>
            <RadialTreeConsole 
                ref='RadialTreeConsole'
                nameList={nameList}
                selectNode={
                    (name: string, nodeBySelect: string) => {
                        this.setState({[name as 'nodeBySelect1']: nodeBySelect})
                    }
                }
                setSelectingName={
                    (name:string) => {
                        this.selectingName = name
                    }
                }
                showPath={
                    () => {
                        this.showPath()
                    }
                }
                hidePath={
                    () => {
                        this.hidePath()
                    }
                }
            />
            </React.Fragment>
        )
    }

    public componentDidMount() : void {//嵌套式数据.json
        axios.get('http://localhost:3000/data/嵌套式数据.json')
            .then((res:AxiosResponse<any>) => {
                // console.log(res.data);
                const treeData:d3.HierarchyNode<any> = d3.hierarchy(res.data).sort((a, b) => d3.ascending(a.data.name, b.data.name))
                
                // console.log(treeData);
                // console.log(this.tree(JSON.parse(JSON.stringify(treeData))))

                this.cutTree(treeData, 3)
                this.setState({nameList: this.circleIsShow})
                // this.tree(treeData)
                // this.tree(treeData)
                this.setState({ treeData : this.tree(treeData) })
                
                // console.log(this.tree(treeData))
            })
    }

    private cutTree(treeData:d3.HierarchyNode<any>, depth: number) : void {
        this.circleIsShow.push(treeData['data']['kks码'])
        if (depth <= treeData['depth']) {
            treeData['children'] = undefined
        }
        if (treeData['children']) {
            treeData['children']!.forEach((value: d3.HierarchyNode<any>) => {
                this.cutTree(value, depth)
            })
        }
    }

    private changeTree() : void {
        axios.get('http://localhost:3000/data/嵌套式数据.json')
            .then((res:AxiosResponse<any>) => {
                // console.log(res.data);
                const treeData:d3.HierarchyNode<any> = d3.hierarchy(res.data).sort((a, b) => d3.ascending(a.data.name, b.data.name))
                this.treeForEach(treeData)
                // console.log(treeData);
                // console.log(this.tree(JSON.parse(JSON.stringify(treeData))))
                // this.cutTree(treeData, 3)
                // this.tree(treeData)
                // this.tree(treeData)
                this.setState({ treeData : this.tree(treeData) })
                
                // console.log(this.tree(treeData))
            })
    }

    private treeForEach(treeData:d3.HierarchyNode<any>) : void {
        if (treeData['children'] && this.circleIsShow.includes(treeData['children'][0]['data']['kks码'])) {
            treeData['children']?.forEach((value: d3.HierarchyNode<any>) => {
                this.treeForEach(value)
            })
        } else {
            treeData['children'] = undefined
        }
    }

    private setCircleColor = (value: d3.HierarchyPointNode<any>):string => (
        value['data'].children ? 
            (value['data']['kks码'] === this.state.nodeBySelect1 || value['data']['kks码'] === this.state.nodeBySelect2 ? 'rgb(9,109,217)' : '#555') : 
            (value['data']['kks码'] === this.state.nodeBySelect1 || value['data']['kks码'] === this.state.nodeBySelect2 ? '#1296db' : '#999')
    )

    private showPath(): void {
        let nodeBySelect1: d3.HierarchyPointNode<any> | null = null
        let nodeBySelect2: d3.HierarchyPointNode<any> | null = null
        const { nodeBySelect1: name1, nodeBySelect2: name2  } = this.state

        this.state.treeData?.descendants().forEach((value: d3.HierarchyPointNode<any>) => {
            if (value['data']['kks码'] === name1) {
                nodeBySelect1 = value
            }
            if (value['data']['kks码'] === name2) {
                nodeBySelect2 = value
            }
        })
        const pathNode:Array<string> = []
        nodeBySelect1!.path(nodeBySelect2 as any).forEach((value: d3.HierarchyPointNode<any>) => {
            pathNode.push(value['data']['kks码'])
            // d3.select('circle.' + value['data']['kks码']).attr('stroke', '#1296db')
        })
        this.setState({ pathNode })
        // console.log()
        // console.log('path: ', this.state.treeData?.descendants()[5].path(this.state.treeData?.descendants()[20]));
    }

    private hidePath(): void {
        this.setState({ pathNode: [] })
    }
}
export default RadialTreeView;