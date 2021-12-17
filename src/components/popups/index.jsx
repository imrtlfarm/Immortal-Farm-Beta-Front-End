import React from 'react'
import { usePopups } from '../../store/popups'
import { Link, Snackbar, Alert } from '@mui/material';

export const Popups = () => {
    const { popups: ActivePopups, RemovePopup } = usePopups()
    return (
        ActivePopups.map((popup) => {
            return <Snackbar key={popup.id}
                open={true}
                autoHideDuration={3000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={
                    () => RemovePopup(popup.id)
                }
            >
                <Alert
                    onClose={() => RemovePopup(popup.id)}
                    severity={popup.type || "info"}>
                    <p style={{ margin: 0 }}>
                        {
                            popup.text
                        }
                    </p>
                    {popup.hasLink &&
                        <Link href={popup.link} target="_blank">
                            View on FTMscan
                        </Link>
                    }
                </Alert>
            </Snackbar>
        })
    )
}