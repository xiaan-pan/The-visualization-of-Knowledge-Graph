import React, {Component} from 'react';
// import * as d3 from 'd3'
import G6 from '@antv/g6'
import '../css/ForceDirectedView.css'
import axios, { AxiosResponse } from 'axios';

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
                    <div className='force-directed-value' id="container">
                        {/* <svg width='100%' height='100%' id='force-directed'>
                            
                        </svg> */}
                    </div>
                </div>
            </React.Fragment>
            
        )
    }

    public componentDidMount() {
        // axios.get('http://localhost:3000/data/三元组关系集.json')
        //     .then((res: AxiosResponse<any>) => {
        //         // console.log(res.data);
        //         const data:any = {
        //             nodes: [],
        //             edges: []
        //         }
        //         const ids:Array<string> = []
        //         res.data.forEach((value: any) => {
        //             if (!ids.includes(value["三元组"]['elem1'])) {
        //                 ids.push(value["三元组"]['elem1'])
        //                 data['nodes'].push({
        //                     id: value["三元组"]['elem1'],
        //                     label: value["三元组"]['elem2'],
        //                     // size: 10
        //                     // style: {
        //                     //     size: 10
        //                     // }
        //                 })
        //             }
        //             if (!ids.includes(value["三元组"]['elem2'])) {
        //                 ids.push(value["三元组"]['elem2'])
        //                 data['nodes'].push({
        //                     id: value["三元组"]['elem2'],
        //                     label: value["三元组"]['elem2'],
        //                     // size: 10
        //                     // style: {
        //                     //     size: 10
        //                     // }
        //                 })
        //             }
        //             data['edges'].push({
        //                 'source': value["三元组"]['elem1'],
        //                 'target': value["三元组"]['elem2'],
        //                 label: value["三元组"]['link']
        //             })
        //         })
        //         const width = 820
        //         const height = 690
        //         const graph = new G6.Graph({
        //             container: 'container',
        //             width,
        //             height,
        //             modes: {
        //                 default: ['zoom-canvas', 'drag-canvas'],
        //             },
        //             layout: {
        //                 // type: 'forceAtlas2',
        //                 // preventOverlap: true,
        //                 // kr: 10,
        //                 // center: [250, 250],
        //                 type: 'force', // 设置布局算法为 force
        //                 linkDistance: 100, // 设置边长为 100
        //                 preventOverlap: true, // 设置防止重叠
        //                 nodeSpacing: 10,
        //                 // nodeStrength: 30,
        //                 // edgeStrength: 0.1, 
        //                 // workerEnabled: true,
        //                 // onTick: () => {
        //                 //     console.log('ticking')
        //                 // }
        //             },
        //             defaultNode: {
        //                 // size: 30,
        //             },
        //         });
        //         graph.data(data);
        //         graph.render();
        //         console.log(typeof graph.getNodeDegree('孙', 'total'));
        //         data.nodes.forEach((node:any) => {
        //             node['size'] = 25 + 1 * (graph.getNodeDegree(node['id'], 'total') as number);
        //             node['style'] = {
        //                 fill: '#007acc'
        //             }
        //         })
        //         graph.read(data)
        //         graph.on('afterlayout', e => {
        //             graph.fitView()

        //         })
        //         function refreshDragedNodePosition(e:any) {
        //             // console.log(e);
        //             const model = e.item.get('model');
        //             model.fx = e.x;
        //             model.fy = e.y;
        //         }
        //         graph.on('node:dragstart', (e) => {
        //             graph.layout();
        //             refreshDragedNodePosition(e);
        //         });
        //         graph.on('node:drag', (e:any) => {
        //             refreshDragedNodePosition(e);
        //             // e.item.refresh()
        //         });
        //         // graph.on('node:dragend', function (e:any) {
        //         //     e.item.get('model').fx = null;
        //         //     e.item.get('model').fy = null;
        //         // });
        //         const container = document.getElementById('container');
        //         if (typeof window !== 'undefined')
        //                 window.onresize = () => {
        //                     if (!graph || graph.get('destroyed')) return;
        //                     if (!container || !container.scrollWidth || !container.scrollHeight) return;
        //                     graph.changeSize(container.scrollWidth, container.scrollHeight);
        //                 };
        //     })
        // return;
        const colors = [
            '#191970',
            '#00008B',
            '#0000CD',
            '#0000FF',
            '#007799',
            '#00BBFF',
            '#00FFFF',
            '#77FFEE',
            '#AAFFEE'
        ].reverse()
        axios.get('http://localhost:3000/data/嵌套式数据.json')
        .then((res:AxiosResponse<any>) => {
            const { data:dataset } = res
            dataset['depth'] = 1
            const queue = [dataset]
            const data:any = {
                nodes: [{
                    "资产编码": dataset['资产编码'],
                    "name": dataset['name'],
                    'id': dataset['kks码'],
                    "资产类型": dataset['资产类型'],
                    "设备类编码": dataset['设备类编码'],
                    "kks码": dataset['kks码'],
                    label: dataset['name'],
                    size: 20 + Math.LOG2E * Math.log(dataset['children'].length) * 3,
                    style: {
                        fill: colors[0]
                    }
                }],
                edges: []
            }
            
            while(queue.length) {
                let trees = queue.shift()
                const depth = trees['depth']
                // if (depth === 5)
                //     break
                if (trees['children']) {
                    trees.children.forEach((child:any) => {
                        child['depth'] = depth + 1
                        queue.push(child)
                        data['edges'].push({
                            'source': trees['kks码'],
                            'target': child['kks码']
                        })
                        data['nodes'].push({
                            "资产编码": child['资产编码'],
                            "name": child['name'],
                            'id': child['kks码'],
                            "资产类型": child['资产类型'],
                            "设备类编码": child['设备类编码'],
                            "kks码": child['kks码'],
                            label: child['name'],
                            size: 20 + Math.LOG2E * Math.log(trees['children'].length + 1) * 3,
                            style: {
                                fill: colors[child['depth']]
                            }
                        })
                    })
                }
            }
            // console.log(data);
            // const layout = new G6.Layout['force']
            // console.log(layout.init(data));
            // const container = document.getElementById('container');
            const width = 820
            const height = 690
            const graph = new G6.Graph({
                container: 'container',
                width,
                height,
                modes: {
                    default: ['zoom-canvas', 'drag-canvas'],
                },
                layout: {
                    // type: 'forceAtlas2',
                    // preventOverlap: true,
                    // kr: 10,
                    // center: [250, 250],
                    type: 'force', // 设置布局算法为 force
                    linkDistance: 100, // 设置边长为 100
                    preventOverlap: true, // 设置防止重叠
                    nodeSpacing: 10,
                    // nodeStrength: 30,
                    // edgeStrength: 0.1, 
                    // workerEnabled: true,
                    // onTick: () => {
                    //     console.log('ticking')
                    // }
                },
                defaultNode: {
                    size: 20,
                    labelCfg: {
                        style: {
                            // fill: '#0000A6',
                            fontSize: 7,
                        }
                    }
                },
            });
            graph.data(data);
            graph.render();
            // graph.on('afterlayout', e => {
            //     graph.fitView()
            //     console.log('fsa')
            // })
            function refreshDragedNodePosition(e:any) {
                console.log(e);
                const model = e.item.get('model');
                model.fx = e.x;
                model.fy = e.y;
            }
            graph.on('node:dragstart', (e) => {
                graph.layout();
                refreshDragedNodePosition(e);
            });
            graph.on('node:drag', (e:any) => {
                refreshDragedNodePosition(e);
                // e.item.refresh()
            });
            // graph.on('node:dragend', function (e:any) {
            //     e.item.get('model').fx = null;
            //     e.item.get('model').fy = null;
            // });
            const container = document.getElementById('container');
            if (typeof window !== 'undefined')
                    window.onresize = () => {
                        if (!graph || graph.get('destroyed')) return;
                        if (!container || !container.scrollWidth || !container.scrollHeight) return;
                        graph.changeSize(container.scrollWidth, container.scrollHeight);
                    };
        })
    }
}
export default ForceDirectedView;