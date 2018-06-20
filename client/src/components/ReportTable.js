import React from 'react'
import _ from 'lodash';
const ReportTable = props => {
    let TableRows;
    let tableArray = props.logs;

return (
    <div class="container table-responsive">
    <table className="table table-hover table-bordered mtable">
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
        </div>
        )
}
    
export default ReportTable