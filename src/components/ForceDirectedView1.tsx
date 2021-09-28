import React, {Component} from 'react';
import * as d3 from 'd3'
// import { event } from 'd3'
import '../css/ForceDirectedView.css'
import axios from 'axios';

interface ForceDirectedViewProps {
    
}
interface ForceDirectedViewState {
    
}
class ForceDirectedView extends Component <ForceDirectedViewProps, ForceDirectedViewState>{

    public constructor(props : ForceDirectedViewProps) {
        super(props)
    }
    
    public render() : JSX.Element {
        
        return (
            <React.Fragment>
                <div className="force-directed-view">
                    <div className='force-directed-title'>
                        力导向图
                    </div>
                    <div className='force-directed-value'>
                        <svg width='100%' height='100%' id='force-directed'>
                            
                        </svg>
                    </div>
                </div>
            </React.Fragment>
            
        )
    }

    public componentDidMount() {
        axios.get('http://localhost:3000/data/data.json')
            .then(res => {
                // console.log(res.data)
            const { nodes, edges } = res.data
        // const nodes = [
        //     {name:"湖南邵阳"},
        //     {name:"山东莱州"},
        //     {name:"广东阳江"},
        //     {name:"山东枣庄"},
        //     {name:"泽"},
        //     {name:"恒"},
        //     {name:"鑫"},
        //     {name:"明山"},
        //     {name:"班长"}
        // ]
        // const edges = [
        //     {source:0,target:4,relation:"籍贯",value:1.3},
        //     {source:4,target:5,relation:"舍友",value:1},
        //     {source:4,target:6,relation:"舍友",value:1},
        //     {source:4,target:7,relation:"舍友",value:1},
        //     {source:1,target:6,relation:"籍贯",value:2},
        //     {source:2,target:5,relation:"籍贯",value:0.9},
        //     {source:3,target:7,relation:"籍贯",value:1},
        //     {source:5,target:6,relation:"同学",value:1.6},
        //     {source:6,target:7,relation:"朋友",value:0.7},
        //     {source:6,target:8,relation:"职责",value:2}
        // ]
        const forceSimulation = d3.forceSimulation()
            .force("link", d3.forceLink())
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter());
        forceSimulation.nodes(nodes as any)
            .on('tick', () => {
                // return;
                // console.log('tick');

                links
                .attr("x1", function (d:any) {

                    return d.source.x;
                })
                .attr("y1", function (d:any) {
                    return d.source.y;
                })
                .attr("x2", function (d:any) {
                    return d.target.x;
                })
                .attr("y2", function (d:any) {
                    return d.target.y;
                });

            // linksText
            //     .attr("x", function (d:any) {
            //         return (d.source.x + d.target.x) / 2;
            //     })
            //     .attr("y", function (d:any) {
            //         return (d.source.y + d.target.y) / 2;
            //     });
            gs
                .attr("transform", function (d:any) {
                    // console.log(d)
                    return "translate(" + d.x + "," + d.y + ")";
                });
            });
        (forceSimulation as any).force("link")
            .links(edges)
            .distance(function (d: any) { //每一边的长度
                return  50;
            });
        //设置图形的中心位置	
        (forceSimulation as any).force("center")
            .x(820 / 2)
            .y(690 / 2);
        const links = d3.select('svg#force-directed')
            .selectAll('line.links')
            .data(edges)
            .join('line')
            .attr('class', 'links')
            .attr('stroke', 'black')
            .attr('stroke-width', '1px')
        // const linksText = d3.select('svg#force-directed')
        //     .selectAll('text.links-text')
        //     .data(edges)
        //     .join('text')
        //     .attr('class', 'links-text')
        //     .text(d => d.relation)
        const gs = d3.select('svg#force-directed').selectAll("g.circleText")
        .data(nodes)
        .join('g')
        .attr("transform", (d:any) => {
            var cirX = d.x;
            var cirY = d.y;
            return "translate(" + cirX + "," + cirY + ")";
        })
        .call(d3.drag()
            .on("start", (event, d:any) => {
                if (!event.active) {
                    forceSimulation.alphaTarget(0.8).restart();
                }
                // console.log(event)
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (event, d:any) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event, d:any) => {
                if (!event.active) {
                    forceSimulation.alphaTarget(0);
                }
                d.fx = null;
                d.fy = null;
            }) as any
        );
        //绘制节点
        gs.append("circle")
            .attr("r", 5)
            .attr("fill", 'red')
        //文字
        gs.append("text")
            .attr("x", -10)
            .attr("y", -20)
            .attr("dy", 10)
            .text((d:any) => d.name)
        // console.log(nodes);
        })
    }
}
export default ForceDirectedView;