import { ToolbarProps, NavigateAction, View } from 'react-big-calendar'

export interface CustomToolbarProps extends ToolbarProps {
    currentView: View
    label: string
    date: Date
    isDisponibilites: boolean
    isEvenement: boolean
    isAppointments: boolean
    onViewChange: (view: View) => void
    onNavigate: (action: NavigateAction) => void
    setIsSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsAddEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsDisponibilites: React.Dispatch<React.SetStateAction<boolean>>
    setIsEvenement: React.Dispatch<React.SetStateAction<boolean>>
    setIsAppointments: React.Dispatch<React.SetStateAction<boolean>>
}