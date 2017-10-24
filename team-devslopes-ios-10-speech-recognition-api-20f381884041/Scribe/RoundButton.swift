//
//  RoundButton.swift
//  Scribe
//
//  Created by Caleb Stultz on 8/10/16.
//  Copyright © 2016 Caleb Stultz. All rights reserved.
//

import UIKit

@IBDesignable
class RoundButton: UIButton {

    @IBInspectable var cornerRadius: CGFloat = 30.0 {
        didSet{
            setupView()
        }
    }
    
    override func prepareForInterfaceBuilder() {
        setupView()
    }
    
    func setupView() {
        layer.cornerRadius = cornerRadius
    }
}
