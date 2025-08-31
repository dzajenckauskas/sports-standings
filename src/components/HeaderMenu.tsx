import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTheme } from 'styled-components'
import { removeParticipantsByTournamentId } from '../features/participantSlice'
import { removeMatchesByTournamentId } from '../features/scoreSlice'
import { TType } from '../types/TType'
import { Typography } from './shared/Typography'

type Props = {
    t: TType;
    tournamentId: string;
}

const HeaderMenu = ({ t, tournamentId }: Props) => {
    const theme = useTheme()

    const dispatch = useDispatch()
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (!menuOpen) return
        const onDown = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false) }
        document.addEventListener('mousedown', onDown)
        return () => document.removeEventListener('mousedown', onDown)
    }, [menuOpen])
    return (
        <div ref={menuRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button
                aria-label={t('actions.more') ?? 'More'}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(v => !v)}
                style={{
                    appearance: 'none',
                    background: "none",
                    outline: "none",
                    border: "none",
                    padding: 0,
                    color: theme.palette.text.primary,
                    width: 24, height: 32,
                    position: 'relative',
                    left: 4,
                    borderRadius: theme.shape.borderRadius,
                    display: 'inline-flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer'
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24"
                    fill={"#fff"}
                    aria-hidden="true">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                </svg>
            </button>
            {menuOpen && (
                <div role="menu" style={{
                    padding: 12,
                    position: 'absolute',
                    top: 38, right: 0,
                    minWidth: 280,
                    background: '#fff',
                    border: `1px solid ${theme.palette.divider.dark}`,
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: '0 10px 20px rgba(16,24,40,.12)', zIndex: 10
                }}>
                    <button role="menuitem" style={{
                        width: '100%', background: 'transparent', border: 'none', textAlign: 'left',
                        padding: '6px 12px', cursor: 'pointer'
                    }}
                        onClick={() => {
                            setMenuOpen(false);
                            const ok = window.confirm(t('actions.confirmClearMatches') ?? '');
                            if (ok) dispatch(removeMatchesByTournamentId(tournamentId));
                        }}>
                        <Typography style={{ margin: 0, color: theme.palette.primary.main }}>
                            {t('actions.clearMatches')}
                        </Typography>
                    </button>
                    <button role="menuitem" style={{
                        width: '100%', background: 'transparent', border: 'none', textAlign: 'left',
                        padding: '6px 12px', cursor: 'pointer'
                    }}
                        onClick={() => {
                            setMenuOpen(false);
                            const ok = window.confirm(t('actions.confirmClearAll') ?? '');
                            if (ok) {
                                dispatch(removeMatchesByTournamentId(tournamentId));
                                dispatch(removeParticipantsByTournamentId(tournamentId));
                            }
                        }}>
                        <Typography style={{ margin: 0, color: theme.palette.primary.main }}>
                            {t('actions.clearAll')}
                        </Typography>
                    </button>
                </div>
            )}
        </div>
    )
}

export default HeaderMenu
