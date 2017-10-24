//
//  ViewController.m
//  AVAudioRecorder
//
//  Created by John Nastos on 7/6/15.
//  Copyright (c) 2015 John Nastos. All rights reserved.
//

#import "ViewController.h"

@import AVFoundation;

@interface ViewController ()

@property (nonatomic,weak) IBOutlet UILabel *statusLabel;
@property (nonatomic,weak) IBOutlet UIButton *recordButton;
@property (nonatomic,weak) IBOutlet UIButton *playButton;

@property (nonatomic,strong) NSURL *audioFile;
@property (nonatomic,strong) AVAudioRecorder *audioRecorder;
@property (nonatomic,strong) AVAudioPlayer *audioPlayer;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    [self setupAudio];
}

- (void) setupAudio {
    NSString *directoryName = NSTemporaryDirectory();
    NSString *fileName = [directoryName stringByAppendingPathComponent:@"audioFile.wav"];
    self.audioFile = [NSURL URLWithString:fileName];
    
    NSDictionary *recordSettings = @{
                                     
                                     AVFormatIDKey:@(kAudioFormatLinearPCM),
                                     AVSampleRateKey:@(44100),
                                     AVNumberOfChannelsKey:@(2),
                                     AVLinearPCMBitDepthKey:@(16),
                                     AVLinearPCMIsBigEndianKey:@(NO),
                                     AVLinearPCMIsFloatKey:@(NO)
                                     
                                     };
    
    NSError *error;
    self.audioRecorder = [[AVAudioRecorder alloc] initWithURL:self.audioFile settings:recordSettings error:&error];
    if (error != nil) {
        NSAssert(error == nil, @"Error");
    }
    
    self.audioRecorder.delegate = self;
}

- (IBAction)recordButtonPressed:(id)sender {
    NSError *error;
    [[AVAudioSession sharedInstance] setActive:YES error:&error];
    if (error != nil) {
        NSAssert(error == nil, @"Error");
    }
    [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayAndRecord error:&error];
    if (error != nil) {
        NSAssert(error == nil, @"Error");
    }
    
    [[AVAudioSession sharedInstance] requestRecordPermission:^(BOOL granted) {
        if (granted) {
            [self.audioRecorder prepareToRecord];
            
            BOOL recorded = [self.audioRecorder recordForDuration:10.0];
            if (!recorded) {
                NSAssert(NO, @"Error");
            }
            
            self.statusLabel.text = @"Recording";
            [self disableButtons];
        } else {
            NSLog(@"No permission");
        }
    }];
}

- (void) audioRecorderEncodeErrorDidOccur:(AVAudioRecorder *)recorder error:(NSError *)error {
    NSAssert(NO, @"Error");
}

- (void) audioRecorderDidFinishRecording:(AVAudioRecorder *)recorder successfully:(BOOL)flag {
    self.statusLabel.text = @"Idle";
    [self enableButtons];
}

- (IBAction)playButtonPressed:(id)sender {
    if (self.audioRecorder.isRecording) {
        return;
    }
    NSError *error;
    self.audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:self.audioFile error:&error];
    if (error != nil) {
        NSAssert(error == nil, @"Error");
    }
    
    [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback error:&error];
    if (error != nil) {
        NSAssert(error == nil, @"Error");
    }
    
    self.audioPlayer.delegate = self;
    [self.audioPlayer play];
    
    self.statusLabel.text = @"Playing";
    [self disableButtons];
}

- (void)audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag {
    self.statusLabel.text = @"Idle";
    [self enableButtons];
}

- (void) disableButtons {
    [self.recordButton setEnabled:NO];
    [self.playButton setEnabled:NO];
}

- (void) enableButtons {
    [self.recordButton setEnabled:YES];
    [self.playButton setEnabled:YES];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
