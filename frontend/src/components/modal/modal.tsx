import React from 'react'
import './modal.css'

interface ModalProps {
    isOpen: boolean;
    setModalOpen: () => void;
    children: React.ReactNode;
  }

export default function Modal({ isOpen, setModalOpen, children }:ModalProps) {
    if (isOpen) {
        return (
            <div className='modal-background'>
                <div className='modal-style'>{children}</div>
                <button className='modal-button-close' onClick={setModalOpen}>X</button>
            </div>
        )
    }
    return null
}