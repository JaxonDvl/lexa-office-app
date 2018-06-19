import React from 'react'
import _ from 'lodash';
const ReportTable = props => {
    let TableRows;
    let tableArray = props.logs;
    console.log(tableArray);
    // TableRows = _.
    // })
    // console.log(TableRows);

return (
    <table className="table table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">When?</th>
                <th scope="col">What?</th>
            </tr>
        </thead>
        <tbody>

            {tableArray.map( (element, index) => {
                console.log(index);
                let rowColor = "table-primary";
                if(element.state === 'Check Out'){
                    rowColor = "table-warning";
                }
                return (
                    <tr className={rowColor} key={element._id}>
                        <th scope="row">{index}</th>
                        <td> {element.firstName + " " + element.lastName} </td>
                        <td> {element.date} </td>
                        <td> {element.state} </td>
                    </tr>
                );
            }) }


            </tbody>
        </table>
        )
}
    
export default ReportTable