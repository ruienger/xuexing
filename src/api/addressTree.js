import counties from './counties'
import states from './states'

let tree = []
counties.forEach(element => {
    tree.push({ value:element.cname, label:element.cname, level: 0, children: states.filter(i=>{
            return i.country_id == element.id
        }).map(e=>{
            return { value:e.cname?e.cname:'全国', label:e.cname?e.cname:'全国', leaf:true, children: null }
        })
    })
});

export default tree
