// ** React Imports
import React, { useState, Fragment } from 'react'

// ** Reactstrap Component Imports
import { UncontrolledTooltip } from 'reactstrap'

const RenderActions = ({ rowInfo, actions }) => {

    // ** Props
    const { index: rowIndex } = rowInfo

    // ** States
    const [selectedAction, setFormAction] = useState(null)

    // ** Filter out not visibile actions
    actions = actions.filter(action => action.visible)

    const isIconDisabled = rowInfo.role_name &&  rowInfo.role_name === 'Admin'

    const handleClick = (actionIndex) => {
        if (isIconDisabled) {
        } else {
            setFormAction(actionIndex)
        }
    }

    return (
        <Fragment key={`score-builder-table-actions-key-${rowIndex}`}>
            <div className='d-flex align-items-center'>
                {actions.map(({ name, Icon }, actionIndex) => <Fragment key={actionIndex}>
                    <div
                        className='cursor-pointer me-1'
                        id={`table-action-tooltip-${rowIndex}-${actionIndex}`}
                        onClick={() => handleClick(actionIndex)} // Call handleClick with actionIndex
                    >
                        {isIconDisabled ? (
                            <span></span>) : (
                            <Icon size={17} />
                        )}
                    </div>
                    <UncontrolledTooltip placement='top' target={`table-action-tooltip-${rowIndex}-${actionIndex}`}>
                        {name}
                    </UncontrolledTooltip>
                </Fragment>
                )
                }
            </div>
            <Fragment>
                {actions.map(({ Component }, actionIndex) => {
                    return (
                        <Component
                            key={actionIndex}
                            componentIndex={actionIndex}
                            selectedAction={selectedAction}
                            setFormAction={setFormAction}
                            rowInfo={rowInfo}
                        />
                    )
                })}
            </Fragment>
        </Fragment>
    )
}

export default RenderActions