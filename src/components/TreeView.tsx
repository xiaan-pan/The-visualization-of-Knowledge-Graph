import axios, { AxiosPromise, AxiosResponse } from 'axios';
import React, {Component} from 'react';
// import * as d3 from 'd3'
import * as echarts from 'echarts'
import '../css/TreeView.css'
import { ECharts, EChartsResponsiveOption } from 'echarts';

interface TreeViewProps {
    
}
interface TreeViewState {
    
}
class TreeView extends Component <TreeViewProps, TreeViewState>{
    private myChart: ECharts | null;
    public constructor(props : TreeViewProps) {
        super(props)
        this.myChart = null
    }
    
    public render() : JSX.Element {
        return (
            <div className='tree-view'>
                <div className='tree-title'>树图</div>
                <div className='tree-value' id='tree-value'>
                    {/* <svg width='100%' height='100%' >

                    </svg> */}
                </div>
            </div>
        )
    }

    public componentDidMount() : void {//嵌套式数据.json
        axios.get('http://localhost:3000/data/嵌套式数据.json')
            .then((res:AxiosResponse<any>) => {
                console.log(res.data);
                // const radius = 487.5
                // const tree = d3.cluster().size([2 * Math.PI, radius - 100])
                // const root = tree(d3.hierarchy(res.data)
                //     .sort((a, b) => d3.ascending(a.data.name, b.data.name)));
                // // console.log(root.links())
                // const svg = d3.select("svg");

                // svg.selectAll("path")
                //     .data(root.links())
                //     .join("path")
                //     .attr("fill", "none")
                //     .attr("stroke", "#555")
                //     .attr("stroke-opacity", 0.4)
                //     .attr("stroke-width", 1.5)
                //     .attr("d", d3.linkRadial()
                //         .angle(d => d.x)
                //         .radius(d => d.y));
                this.myChart = echarts.init(document.getElementById('tree-value') as HTMLDivElement);
                const option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                    },
                    series: [
                        {
                            type: 'tree',
            
                            data: [res.data],
            
                            top: '18%',
                            bottom: '14%',
            
                            layout: 'radial',
            
                            symbol: 'emptyCircle',
            
                            symbolSize: 4,
                            // large: true,
                            roam: true,
                            initialTreeDepth: 3,
            
                            animationDurationUpdate: 750,
            
                            emphasis: {
                                focus: 'descendant'
                            }
                        }
                    ]
                };
                this.myChart.setOption(option as EChartsResponsiveOption)

            })
    }
}
export default TreeView;