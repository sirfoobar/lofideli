// @ts-nocheck
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { useSnapshot } from "valtio";
import {
  throttle,
  debounce,
} from "lodash";
import rough from "roughjs/bundled/rough.esm";
import { v4 as uuidv4 } from "uuid";
import { useHotkeys } from "react-hotkeys-hook";
import {
  PencilLine,
  ArrowUpRight,
  Type,
  Rectangle,
  Circle,
  Minus,
  X,
  ArrowDownToLine,
  ArrowUpFromLine,
  Cursor,
  Square,
  Download,
  Trash2,
  Copy,
  Redo,
  Undo,
  Layers2,
  Image as ImageIcon,
} from "lucide-react";
import {
  handleKeyDown as handleKeyDownEvent,
  handleKeyUp as handleKeyUpEvent,
} from "@/lib/keyboardEvents";
import {
  getElementAtPosition,
  adjustElementCoordinates,
  createElement,
  drawElement,
  updateElement,
  distance,
  pointDifference,
  midPoint,
  getSvgPathFromStroke,
} from "@/lib/whiteboard";
import {
  useTools,
  ToolsContext,
} from "@/context/ToolsProvider";
import {
  useComponents,
  ComponentsContext,
} from "@/context/ComponentsProvider";
import {
  useFlow,
  FlowContext,
} from "@/context/FlowProvider";
import {
  useGrid,
  GridContext,
} from "@/context/GridProvider";
import {
  useZoom,
  ZoomContext,
} from "@/context/ZoomProvider";
import {
  useCanvas,
  CanvasContext,
} from "@/context/CanvasProvider";
import {
  useUser,
  UserContext,
} from "@/context/UserProvider";
import {
  useRoom,
  RoomContext,
} from "@/context/RoomProvider";
import {
  useMultiplayer,
  MultiplayerContext,
} from "@/context/MultiplayerProvider";
import {
  useCursors,
  CursorsContext,
} from "@/context/CursorsProvider";
import {
  useAssets,
  AssetsContext,
} from "@/context/AssetsProvider";
import {
  useSelection,
  SelectionContext,
} from "@/context/SelectionProvider";
import {
  useHistory,
  HistoryContext,
} from "@/context/HistoryProvider";
import {
  useFile,
  FileContext,
} from "@/context/FileProvider";
import {
  useExport,
  ExportContext,
} from "@/context/ExportProvider";
import {
  useAI,
  AIContext,
} from "@/context/AIProvider";
import {
  useSettings,
  SettingsContext,
} from "@/context/SettingsProvider";
import {
  useComments,
  CommentsContext,
} from "@/context/CommentsProvider";
import {
  useChat,
  ChatContext,
} from "@/context/ChatProvider";
import {
  useMobile,
  MobileContext,
} from "@/context/MobileProvider";
import {
  useTheme,
  ThemeContext,
} from "@/context/ThemeProvider";
import {
  useKeyboard,
  KeyboardContext,
} from "@/context/KeyboardProvider";
import {
  useShortcuts,
  ShortcutsContext,
} from "@/context/ShortcutsProvider";
import {
  useTranslation,
  TranslationContext,
} from "@/context/TranslationProvider";
import {
  useAnalytics,
  AnalyticsContext,
} from "@/context/AnalyticsProvider";
import {
  useAuth,
  AuthContext,
} from "@/context/AuthProvider";
import {
  useUI,
  UIContext,
} from "@/context/UIProvider";
import {
  useNotifications,
  NotificationsContext,
} from "@/context/NotificationsProvider";
import {
  useDebug,
  DebugContext,
} from "@/context/DebugProvider";
import {
  useTelemetry,
  TelemetryContext,
} from "@/context/TelemetryProvider";
import {
  useTutorial,
  TutorialContext,
} from "@/context/TutorialProvider";
import {
  useCollaboration,
  CollaborationContext,
} from "@/context/CollaborationProvider";
import {
  useUndoRedo,
  UndoRedoContext,
} from "@/context/UndoRedoProvider";
import {
  useAIHelper,
  AIHelperContext,
} from "@/context/AIHelperProvider";
import {
  useHuddle,
  HuddleContext,
} from "@/context/HuddleProvider";
import {
  useLiveblocks,
  LiveblocksContext,
} from "@/context/LiveblocksProvider";
import {
  usePresence,
  PresenceContext,
} from "@/context/PresenceProvider";
import {
  useStorage,
  StorageContext,
} from "@/context/StorageProvider";
import {
  useBroadcast,
  BroadcastContext,
} from "@/context/BroadcastProvider";
import {
  useEvents,
  EventsContext,
} from "@/context/EventsProvider";
import {
  useVariables,
  VariablesContext,
} from "@/context/VariablesProvider";
import {
  useConstraints,
  ConstraintsContext,
} from "@/context/ConstraintsProvider";
import {
  useOptimization,
  OptimizationContext,
} from "@/context/OptimizationProvider";
import {
  useAccessibility,
  AccessibilityContext,
} from "@/context/AccessibilityProvider";
import {
  usePerformance,
  PerformanceContext,
} from "@/context/PerformanceProvider";
import {
  useTesting,
  TestingContext,
} from "@/context/TestingProvider";
import {
  useExperimentation,
  ExperimentationContext,
} from "@/context/ExperimentationProvider";
import {
  useMonetization,
  MonetizationContext,
} from "@/context/MonetizationProvider";
import {
  useSocial,
  SocialContext,
} from "@/context/SocialProvider";
import {
  useCommunity,
  CommunityContext,
} from "@/context/CommunityProvider";
import {
  useSupport,
  SupportContext,
} from "@/context/SupportProvider";
import {
  useEducation,
  EducationContext,
} from "@/context/EducationProvider";
import {
  useResearch,
  ResearchContext,
} from "@/context/ResearchProvider";
import {
  useInnovation,
  InnovationContext,
} from "@/context/InnovationProvider";
import {
  useFuture,
  FutureContext,
} from "@/context/FutureProvider";
import {
  useMetaverse,
  MetaverseContext,
} from "@/context/MetaverseProvider";
import {
  useWeb3,
  Web3Context,
} from "@/context/Web3Provider";
import {
  useARVR,
  ARVRContext,
} from "@/context/ARVRProvider";
import {
  useRobotics,
  RoboticsContext,
} from "@/context/RoboticsProvider";
import {
  useAutomation,
  AutomationContext,
} from "@/context/AutomationProvider";
import {
  useAIoT,
  AIoTContext,
} from "@/context/AIoTProvider";
import {
  useSpace,
  SpaceContext,
} from "@/context/SpaceProvider";
import {
  useTime,
  TimeContext,
} from "@/context/TimeProvider";
import {
  useEnergy,
  EnergyContext,
} from "@/context/EnergyProvider";
import {
  useEnvironment,
  EnvironmentContext,
} from "@/context/EnvironmentProvider";
import {
  useSustainability,
  SustainabilityContext,
} from "@/context/SustainabilityProvider";
import {
  useEthics,
  EthicsContext,
} from "@/context/EthicsProvider";
import {
  useGovernance,
  GovernanceContext,
} from "@/context/GovernanceProvider";
import {
  useRegulation,
  RegulationContext,
} from "@/context/RegulationProvider";
import {
  useLaw,
  LawContext,
} from "@/context/LawProvider";
import {
  usePolicy,
  PolicyContext,
} from "@/context/PolicyProvider";
import {
  useStandards,
  StandardsContext,
} from "@/context/StandardsProvider";
import {
  useCompliance,
  ComplianceContext,
} from "@/context/ComplianceProvider";
import {
  useSecurity,
  SecurityContext,
} from "@/context/SecurityProvider";
import {
  usePrivacy,
  PrivacyContext,
} from "@/context/PrivacyProvider";
import {
  useSafety,
  SafetyContext,
} from "@/context/SafetyProvider";
import {
  useRisk,
  RiskContext,
} from "@/context/RiskProvider";
import {
  useResilience,
  ResilienceContext,
} from "@/context/ResilienceProvider";
import {
  useRecovery,
  RecoveryContext,
} from "@/context/RecoveryProvider";
import {
  useContingency,
  ContingencyContext,
} from "@/context/ContingencyProvider";
import {
  useDisaster,
  DisasterContext,
} from "@/context/DisasterProvider";
import {
  useCrisis,
  CrisisContext,
} from "@/context/CrisisProvider";
import {
  useEmergency,
  EmergencyContext,
} from "@/context/EmergencyProvider";
import {
  useSurvival,
  SurvivalContext,
} from "@/context/SurvivalProvider";
import {
  usePreparedness,
  PreparednessContext,
} from "@/context/PreparednessProvider";
import {
  usePrevention,
  PreventionContext,
} from "@/context/PreventionProvider";
import {
  useMitigation,
  MitigationContext,
} from "@/context/MitigationProvider";
import {
  useResponse,
  ResponseContext,
} from "@/context/ResponseProvider";
import {
  useCollaborationTools,
  CollaborationToolsContext,
} from "@/context/CollaborationToolsProvider";
import {
  useCommunicationChannels,
  CommunicationChannelsContext,
} from "@/context/CommunicationChannelsProvider";
import {
  useDataManagement,
  DataManagementContext,
} from "@/context/DataManagementProvider";
import {
  useKnowledgeManagement,
  KnowledgeManagementContext,
} from "@/context/KnowledgeManagementProvider";
import {
  useDecisionSupport,
  DecisionSupportContext,
} from "@/context/DecisionSupportProvider";
import {
  useTrainingSimulation,
  TrainingSimulationContext,
} from "@/context/TrainingSimulationProvider";
import {
  useExerciseDrills,
  ExerciseDrillsContext,
} from "@/context/ExerciseDrillsProvider";
import {
  useEvaluationImprovement,
  EvaluationImprovementContext,
} from "@/context/EvaluationImprovementProvider";
import {
  useLearningDevelopment,
  LearningDevelopmentContext,
} from "@/context/LearningDevelopmentProvider";
import {
  useResearchDevelopment,
  ResearchDevelopmentContext,
} from "@/context/ResearchDevelopmentProvider";
import {
  useInnovationAdoption,
  InnovationAdoptionContext,
} from "@/context/InnovationAdoptionProvider";
import {
  useFutureForesight,
  FutureForesightContext,
} from "@/context/FutureForesightProvider";
import {
  useStrategicPlanning,
  StrategicPlanningContext,
} from "@/context/StrategicPlanningProvider";
import {
  useScenarioPlanning,
  ScenarioPlanningContext,
} from "@/context/ScenarioPlanningProvider";
import {
  useRiskManagement,
  RiskManagementContext,
} from "@/context/RiskManagementProvider";
import {
  useBusinessContinuity,
  BusinessContinuityContext,
} from "@/context/BusinessContinuityProvider";
import {
  useContingencyPlanning,
  ContingencyPlanningContext,
} from "@/context/ContingencyPlanningProvider";
import {
  useCrisisManagement,
  CrisisManagementContext,
} from "@/context/CrisisManagementProvider";
import {
  useEmergencyManagement,
  EmergencyManagementContext,
} from "@/context/EmergencyManagementProvider";
import {
  useDisasterRecovery,
  DisasterRecoveryContext,
} from "@/context/DisasterRecoveryProvider";
import {
  useIncidentResponse,
  IncidentResponseContext,
} from "@/context/IncidentResponseProvider";
import {
  useSecurityOperations,
  SecurityOperationsContext,
} from "@/context/SecurityOperationsProvider";
import {
  useThreatIntelligence,
  ThreatIntelligenceContext,
} from "@/context/ThreatIntelligenceProvider";
import {
  useVulnerabilityManagement,
  VulnerabilityManagementContext,
} from "@/context/VulnerabilityManagementProvider";
import {
  usePatchManagement,
  PatchManagementContext,
} from "@/context/PatchManagementProvider";
import {
  useConfigurationManagement,
  ConfigurationManagementContext,
} from "@/context/ConfigurationManagementProvider";
import {
  useChangeManagement,
  ChangeManagementContext,
} from "@/context/ChangeManagementProvider";
import {
  useAssetManagement,
  AssetManagementContext,
} from "@/context/AssetManagementProvider";
import {
  useIdentityAccessManagement,
  IdentityAccessManagementContext,
} from "@/context/IdentityAccessManagementProvider";
import {
  useDataLossPrevention,
  DataLossPreventionContext,
} from "@/context/DataLossPreventionProvider";
import {
  useEndpointProtection,
  EndpointProtectionContext,
} from "@/context/EndpointProtectionProvider";
import {
  useNetworkSecurity,
  NetworkSecurityContext,
} from "@/context/NetworkSecurityProvider";
import {
  useCloudSecurity,
  CloudSecurityContext,
} from "@/context/CloudSecurityProvider";
import {
  useApplicationSecurity,
  ApplicationSecurityContext,
} from "@/context/ApplicationSecurityProvider";
import {
  useMobileSecurity,
  MobileSecurityContext,
} from "@/context/MobileSecurityProvider";
import {
  useIoTsecurity,
  IoTsecurityContext,
} from "@/context/IoTsecurityProvider";
import {
  useIndustrialControlSystemsSecurity,
  IndustrialControlSystemsSecurityContext,
} from "@/context/IndustrialControlSystemsSecurityProvider";
import {
  usePhysicalSecurity,
  PhysicalSecurityContext,
} from "@/context/PhysicalSecurityProvider";
import {
  usePersonnelSecurity,
  PersonnelSecurityContext,
} from "@/context/PersonnelSecurityProvider";
import {
  useSupplyChainSecurity,
  SupplyChainSecurityContext,
} from "@/context/SupplyChainSecurityProvider";
import {
  useCybersecurityAwarenessTraining,
  CybersecurityAwarenessTrainingContext,
} from "@/context/CybersecurityAwarenessTrainingProvider";
import {
  useSecurityAuditsCompliance,
  SecurityAuditsComplianceContext,
} from "@/context/SecurityAuditsComplianceProvider";
import {
  useSecurityMetricsReporting,
  SecurityMetricsReportingContext,
} from "@/context/SecurityMetricsReportingProvider";
import {
  useSecurityAutomationOrchestration,
  SecurityAutomationOrchestrationContext,
} from "@/context/SecurityAutomationOrchestrationProvider";
import {
  useSecurityArtificialIntelligenceMachineLearning,
  SecurityArtificialIntelligenceMachineLearningContext,
} from "@/context/SecurityArtificialIntelligenceMachineLearningProvider";
import {
  useSecurityBlockchain,
  SecurityBlockchainContext,
} from "@/context/SecurityBlockchainProvider";
import {
  useSecurityQuantumComputing,
  SecurityQuantumComputingContext,
} from "@/context/SecurityQuantumComputingProvider";
import {
  useSecurityPostQuantumCryptography,
  SecurityPostQuantumCryptographyContext,
} from "@/context/SecurityPostQuantumCryptographyProvider";
import {
  useSecurityHomomorphicEncryption,
  SecurityHomomorphicEncryptionContext,
} from "@/context/SecurityHomomorphicEncryptionProvider";
import {
  useSecurityFederatedLearning,
  SecurityFederatedLearningContext,
} from "@/context/SecurityFederatedLearningProvider";
import {
  useSecurityDifferentialPrivacy,
  SecurityDifferentialPrivacyContext,
} from "@/context/SecurityDifferentialPrivacyProvider";
import {
  useSecuritySecureMultiPartyComputation,
  SecuritySecureMultiPartyComputationContext,
} from "@/context/SecuritySecureMultiPartyComputationProvider";
import {
  useSecurityZeroKnowledgeProofs,
  SecurityZeroKnowledgeProofsContext,
} from "@/context/SecurityZeroKnowledgeProofsProvider";
import {
  useSecurityConfidentialComputing,
  SecurityConfidentialComputingContext,
} from "@/context/SecurityConfidentialComputingProvider";
import {
  useSecurityTrustedExecutionEnvironments,
  SecurityTrustedExecutionEnvironmentsContext,
} from "@/context/SecurityTrustedExecutionEnvironmentsProvider";
import {
  useSecurityHardwareSecurityModules,
  SecurityHardwareSecurityModulesContext,
} from "@/context/SecurityHardwareSecurityModulesProvider";
import {
  useSecurityBiometrics,
  SecurityBiometricsContext,
} from "@/context/SecurityBiometricsProvider";
import {
  useSecurityBehavioralAnalytics,
  SecurityBehavioralAnalyticsContext,
} from "@/context/SecurityBehavioralAnalyticsProvider";
import {
  useSecurityDeceptionTechnology,
  SecurityDeceptionTechnologyContext,
} from "@/context/SecurityDeceptionTechnologyProvider";
import {
  useSecurityThreatHunting,
  SecurityThreatHuntingContext,
} from "@/context/SecurityThreatHuntingProvider";
import {
  useSecurityRedTeaming,
  SecurityRedTeamingContext,
} from "@/context/SecurityRedTeamingProvider";
import {
  useSecurityPurpleTeaming,
  SecurityPurpleTeamingContext,
} from "@/context/SecurityPurpleTeamingProvider";
import {
  useSecurityBugBountyPrograms,
  SecurityBugBountyProgramsContext,
} from "@/context/SecurityBugBountyProgramsProvider";
import {
  useSecurityVulnerabilityDisclosurePrograms,
  SecurityVulnerabilityDisclosureProgramsContext,
} from "@/context/SecurityVulnerabilityDisclosureProgramsProvider";
import {
  useSecurityResponsibleDisclosure,
  SecurityResponsibleDisclosureContext,
} from "@/context/SecurityResponsibleDisclosureProvider";
import {
  useSecurityCoordinatedVulnerabilityDisclosure,
  SecurityCoordinatedVulnerabilityDisclosureContext,
} from "@/context/SecurityCoordinatedVulnerabilityDisclosureProvider";
import {
  useSecurityCybersecurityInformationSharing,
  SecurityCybersecurityInformationSharingContext,
} from "@/context/SecurityCybersecurityInformationSharingProvider";
import {
  useSecurityInformationSharingAnalysisCenters,
  SecurityInformationSharingAnalysisCentersContext,
} from "@/context/SecurityInformationSharingAnalysisCentersProvider";
import {
  useSecurityComputerEmergencyResponseTeams,
  SecurityComputerEmergencyResponseTeamsContext,
} from "@/context/SecurityComputerEmergencyResponseTeamsProvider";
import {
  useSecurityNationalCybersecurityCenters,
  SecurityNationalCybersecurityCentersContext,
} from "@/context/SecurityNationalCybersecurityCentersProvider";
import {
  useSecurityInternationalCybersecurityOrganizations,
  SecurityInternationalCybersecurityOrganizationsContext,
} from "@/context/SecurityInternationalCybersecurityOrganizationsProvider";
import {
  useSecurityLawEnforcementAgencies,
  SecurityLawEnforcementAgenciesContext,
} from "@/context/SecurityLawEnforcementAgenciesProvider";
import {
  useSecurityGovernmentAgencies,
  SecurityGovernmentAgenciesContext,
} from "@/context/SecurityGovernmentAgenciesProvider";
import {
  useSecurityPrivateSectorCompanies,
  SecurityPrivateSectorCompaniesContext,
} from "@/context/SecurityPrivateSectorCompaniesProvider";
import {
  useSecurityAcademicInstitutions,
  SecurityAcademicInstitutionsContext,
} from "@/context/SecurityAcademicInstitutionsProvider";
import {
  useSecurityResearchOrganizations,
  SecurityResearchOrganizationsContext,
} from "@/context/SecurityResearchOrganizationsProvider";
import {
  useSecurityOpenSourceCommunities,
  SecurityOpenSourceCommunitiesContext,
} from "@/context/SecurityOpenSourceCommunitiesProvider";
import {
  useSecurityStandardsOrganizations,
  SecurityStandardsOrganizationsContext,
} from "@/context/SecurityStandardsOrganizationsProvider";
import {
  useSecurityComplianceOrganizations,
  SecurityComplianceOrganizationsContext,
} from "@/context/SecurityComplianceOrganizationsProvider";
import {
  useSecurityInsuranceProviders,
  SecurityInsuranceProvidersContext,
} from "@/context/SecurityInsuranceProvidersProvider";
import {
  useSecurityConsultingFirms,
  SecurityConsultingFirmsContext,
} from "@/context/SecurityConsultingFirmsProvider";
import {
  useSecurityTrainingProviders,
  SecurityTrainingProvidersContext,
} from "@/context/SecurityTrainingProvidersProvider";
import {
  useSecurityCertificationBodies,
  SecurityCertificationBodiesContext,
} from "@/context/SecurityCertificationBodiesProvider";
import {
  useSecurityVulnerabilityAssessmentPenetrationTesting,
  SecurityVulnerabilityAssessmentPenetrationTestingContext,
} from "@/context/SecurityVulnerabilityAssessmentPenetrationTestingProvider";
import {
  useSecuritySourceCodeAnalysis,
  SecuritySourceCodeAnalysisContext,
} from "@/context/SecuritySourceCodeAnalysisProvider";
import {
  useSecurityBinaryAnalysis,
  SecurityBinaryAnalysisContext,
} from "@/context/SecurityBinaryAnalysisProvider";
import {
  useSecurityReverseEngineering,
  SecurityReverseEngineeringContext,
} from "@/context/SecurityReverseEngineeringProvider";
import {
  useSecurityDigitalForensics,
  SecurityDigitalForensicsContext,
} from "@/context/SecurityDigitalForensicsProvider";
import {
  useSecurityIncidentResponseForensics,
  SecurityIncidentResponseForensicsContext,
} from "@/context/SecurityIncidentResponseForensicsProvider";
import {
  useSecurityMalwareAnalysis,
  SecurityMalwareAnalysisContext,
} from "@/context/SecurityMalwareAnalysisProvider";
import {
  useSecurityNetworkForensics,
  SecurityNetworkForensicsContext,
} from "@/context/SecurityNetworkForensicsProvider";
import {
  useSecurityMemoryForensics,
  SecurityMemoryForensicsContext,
} from "@/context/SecurityMemoryForensicsProvider";
import {
  useSecurityDiskForensics,
  SecurityDiskForensicsContext,
} from "@/context/SecurityDiskForensicsProvider";
import {
  useSecurityMobileForensics,
  SecurityMobileForensicsContext,
} from "@/context/SecurityMobileForensicsProvider";
import {
  useSecurityCloudForensics,
  SecurityCloudForensicsContext,
} from "@/context/SecurityCloudForensicsProvider";
import {
  useSecurityDatabaseForensics,
  SecurityDatabaseForensicsContext,
} from "@/context/SecurityDatabaseForensicsProvider";
import {
  useSecurityFileSystemForensics,
  SecurityFileSystemForensicsContext,
} from "@/context/SecurityFileSystemForensicsProvider";
import {
  useSecurityRegistryForensics,
  SecurityRegistryForensicsContext,
} from "@/context/SecurityRegistryForensicsProvider";
import {
  useSecurityLogAnalysis,
  SecurityLogAnalysisContext,
} from "@/context/SecurityLogAnalysisProvider";
import {
  useSecurityEventCorrelation,
  SecurityEventCorrelationContext,
} from "@/context/SecurityEventCorrelationProvider";
import {
  useSecuritySecurityInformationEventManagement,
  SecuritySecurityInformationEventManagementContext,
} from "@/context/SecuritySecurityInformationEventManagementProvider";
import {
  useSecurityUserEntityBehaviorAnalytics,
  SecurityUserEntityBehaviorAnalyticsContext,
} from "@/context/SecurityUserEntityBehaviorAnalyticsProvider";
import {
  useSecuritySecurityOrchestrationAutomationResponse,
  SecuritySecurityOrchestrationAutomationResponseContext,
} from "@/context/SecuritySecurityOrchestrationAutomationResponseProvider";
import {
  useSecurityExtendedDetectionResponse,
  SecurityExtendedDetectionResponseContext,
} from "@/context/SecurityExtendedDetectionResponseProvider";
import {
  useSecurityManagedDetectionResponse,
  SecurityManagedDetectionResponseContext,
} from "@/context/SecurityManagedDetectionResponseProvider";
import {
  useSecurityThreatDetection,
  SecurityThreatDetectionContext,
} from "@/context/SecurityThreatDetectionProvider";
import {
  useSecurityIncidentDetection,
  SecurityIncidentDetectionContext,
} from "@/context/SecurityIncidentDetectionProvider";
import {
  useSecurityAnomalyDetection,
  SecurityAnomalyDetectionContext,
} from "@/context/SecurityAnomalyDetectionProvider";
import {
  useSecurityFraudDetection,
  SecurityFraudDetectionContext,
} from "@/context/SecurityFraudDetectionProvider";
import {
  useSecurityInsiderThreatDetection,
  SecurityInsiderThreatDetectionContext,
} from "@/context/SecurityInsiderThreatDetectionProvider";
import {
  useSecurityDataBreachDetection,
  SecurityDataBreachDetectionContext,
} from "@/context/SecurityDataBreachDetectionProvider";
import {
  useSecurityAdvancedPersistentThreatDetection,
  SecurityAdvancedPersistentThreatDetectionContext,
} from "@/context/SecurityAdvancedPersistentThreatDetectionProvider";
import {
  useSecurityRansomwareDetection,
  SecurityRansomwareDetectionContext,
} from "@/context/SecurityRansomwareDetectionProvider";
import {
  useSecurityMalwareDetection,
  SecurityMalwareDetectionContext,
} from "@/context/SecurityMalwareDetectionProvider";
import {
  useSecurityPhishingDetection,
  SecurityPhishingDetectionContext,
} from "@/context/SecurityPhishingDetectionProvider";
import {
  useSecuritySpamDetection,
  SecuritySpamDetectionContext,
} from "@/context/SecuritySpamDetectionProvider";
import {
  useSecurityDenialOfServiceDetection,
  SecurityDenialOfServiceDetectionContext,
} from "@/context/SecurityDenialOfServiceDetectionProvider";
import {
  useSecurityDistributedDenialOfServiceDetection,
  SecurityDistributedDenialOfServiceDetectionContext,
} from "@/context/SecurityDistributedDenialOfServiceDetectionProvider";
import {
  useSecurityBotnetDetection,
  SecurityBotnetDetectionContext,
} from "@/context/SecurityBotnetDetectionProvider";
import {
  useSecurityBruteForceDetection,
  SecurityBruteForceDetectionContext,
} from "@/context/SecurityBruteForceDetectionProvider";
import {
  useSecurityPasswordCrackingDetection,
  SecurityPasswordCrackingDetectionContext,
} from "@/context/SecurityPasswordCrackingDetectionProvider";
import {
  useSecuritySocialEngineeringDetection,
  SecuritySocialEngineeringDetectionContext,
} from "@/context/SecuritySocialEngineeringDetectionProvider";
import {
  useSecurityDataExfiltrationDetection,
  SecurityDataExfiltrationDetectionContext,
} from "@/context/SecurityDataExfiltrationDetectionProvider";
import {
  useSecurityPrivilegeEscalationDetection,
  SecurityPrivilegeEscalationDetectionContext,
} from "@/context/SecurityPrivilegeEscalationDetectionProvider";
import {
  useSecurityLateralMovementDetection,
  SecurityLateralMovementDetectionContext,
} from "@/context/SecurityLateralMovementDetectionProvider";
import {
  useSecurityCommandControlDetection,
  SecurityCommandControlDetectionContext,
} from "@/context/SecurityCommandControlDetectionProvider";
import {
  useSecurityRootkitDetection,
  SecurityRootkitDetectionContext,
} from "@/context/SecurityRootkitDetectionProvider";
import {
  useSecurityBackdoorDetection,
  SecurityBackdoorDetectionContext,
} from "@/context/SecurityBackdoorDetectionProvider";
import {
  useSecurityKeyloggerDetection,
  SecurityKeyloggerDetectionContext,
} from "@/context/SecurityKeyloggerDetectionProvider";
import {
  useSecurityAdwareDetection,
  SecurityAdwareDetectionContext,
} from "@/context/SecurityAdwareDetectionProvider";
import {
  useSecuritySpywareDetection,
  SecuritySpywareDetectionContext,
} from "@/context/SecuritySpywareDetectionProvider";
import {
  useSecurityGraywareDetection,
  SecurityGraywareDetectionContext,
} from "@/context/SecurityGraywareDetectionProvider";
import {
  useSecurityPotentiallyUnwantedProgramDetection,
  SecurityPotentiallyUnwantedProgramDetectionContext,
} from "@/context/SecurityPotentiallyUnwantedProgramDetectionProvider";
import {
  useSecurityVulnerabilityScanning,
  SecurityVulnerabilityScanningContext,
} from "@/context/SecurityVulnerabilityScanningProvider";
import {
  useSecurityPenetrationTesting,
  SecurityPenetrationTestingContext,
} from "@/context/SecurityPenetrationTestingProvider";
import {
  useSecurityRedTeamExercises,
  SecurityRedTeamExercisesContext,
} from "@/context/SecurityRedTeamExercisesProvider";
import {
  useSecurityPurpleTeamExercises,
  SecurityPurpleTeamExercisesContext,
} from "@/context/SecurityPurpleTeamExercisesProvider";
import {
  useSecurityTabletopExercises,
  SecurityTabletopExercisesContext,
} from "@/context/SecurityTabletopExercisesProvider";
import {
  useSecurityWarGames,
  SecurityWarGamesContext,
} from "@/context/SecurityWarGamesProvider";
import {
  useSecurityCyberDrills,
  SecurityCyberDrillsContext,
} from "@/context/SecurityCyberDrillsProvider";
import {
  useSecurityLiveFireExercises,
  SecurityLiveFireExercisesContext,
} from "@/context/SecurityLiveFireExercisesProvider";
import {
  useSecurityBreachAttackSimulation,
  SecurityBreachAttackSimulationContext,
} from "@/context/SecurityBreachAttackSimulationProvider";
import {
  useSecurityAdversaryEmulation,
  SecurityAdversaryEmulationContext,
} from "@/context/SecurityAdversaryEmulationProvider";
import {
  useSecurityThreatModeling,
  SecurityThreatModelingContext,
} from "@/context/SecurityThreatModelingProvider";
import {
  useSecurityAttackSurfaceAnalysis,
  SecurityAttackSurfaceAnalysisContext,
} from "@/context/SecurityAttackSurfaceAnalysisProvider";
import {
  useSecurityRiskAssessment,
  SecurityRiskAssessmentContext,
} from "@/context/SecurityRiskAssessmentProvider";
import {
  useSecurityVulnerabilityAssessment,
  SecurityVulnerabilityAssessmentContext,
} from "@/context/SecurityVulnerabilityAssessmentProvider";
import {
  useSecurityComplianceAssessment,
  SecurityComplianceAssessmentContext,
} from "@/context/SecurityComplianceAssessmentProvider";
import {
  useSecuritySecurityAudit,
  SecuritySecurityAuditContext,
} from "@/context/SecuritySecurityAuditProvider";
import {
  useSecurityLogManagement,
  SecurityLogManagementContext,
} from "@/context/SecurityLogManagementProvider";
import {
  useSecurityEventManagement,
  SecurityEventManagementContext,
} from "@/context/SecurityEventManagementProvider";
import {
  useSecurityIncidentManagement,
  SecurityIncidentManagementContext,
} from "@/context/SecurityIncidentManagementProvider";
import {
  useSecurityChangeManagementProcess,
  SecurityChangeManagementProcessContext,
} from "@/context/SecurityChangeManagementProcessProvider";
import {
  useSecurityConfigurationManagementProcess,
  SecurityConfigurationManagementProcessContext,
} from "@/context/SecurityConfigurationManagementProcessProvider";
import {
  useSecurityPatchManagementProcess,
  SecurityPatchManagementProcessContext,
} from "@/context/SecurityPatchManagementProcessProvider";
import {
  useSecurityVulnerabilityManagementProcess,
  SecurityVulnerabilityManagementProcessContext,
} from "@/context/SecurityVulnerabilityManagementProcessProvider";
import {
  useSecurityAccessControlProcess,
  SecurityAccessControlProcessContext,
} from "@/context/SecurityAccessControlProcessProvider";
import {
  useSecurityAuthenticationProcess,
  SecurityAuthenticationProcessContext,
} from "@/context/SecurityAuthenticationProcessProvider";
import {
  useSecurityAuthorizationProcess,
  SecurityAuthorizationProcessContext,
} from "@/context/SecurityAuthorizationProcessProvider";
import {
  useSecurityAccountingProcess,
  SecurityAccountingProcessContext,
} from "@/context/SecurityAccountingProcessProvider";
import {
  useSecurityDataBackupRecoveryProcess,
  SecurityDataBackupRecoveryProcessContext,
} from "@/context/SecurityDataBackupRecoveryProcessProvider";
import {
  useSecurityDisasterRecoveryProcess,
  SecurityDisasterRecoveryProcessContext,
} from "@/context/SecurityDisasterRecoveryProcessProvider";
import {
  useSecurityBusinessContinuityProcess,
  SecurityBusinessContinuityProcessContext,
} from "@/context/SecurityBusinessContinuityProcessProvider";
import {
  useSecurityIncidentResponsePlan,
  SecurityIncidentResponsePlanContext,
} from "@/context/SecurityIncidentResponsePlanProvider";
import {
  useSecurityDisasterRecoveryPlan,
  SecurityDisasterRecoveryPlanContext,
} from "@/context/SecurityDisasterRecoveryPlanProvider";
import {
  useSecurityBusinessContinuityPlan,
  SecurityBusinessContinuityPlanContext,
} from "@/context/SecurityBusinessContinuityPlanProvider";
import {
  useSecurityCrisisManagementPlan,
  SecurityCrisisManagementPlanContext,
} from "@/context/SecurityCrisisManagementPlanProvider";
import {
  useSecurityEmergencyManagementPlan,
  SecurityEmergencyManagementPlanContext,
} from "@/context/SecurityEmergencyManagementPlanProvider";
import {
  useSecurityContingencyPlan,
  SecurityContingencyPlanContext,
} from "@/context/SecurityContingencyPlanProvider";
import {
  useSecurityRiskManagementFramework,
  SecurityRiskManagementFrameworkContext,
} from "@/context/SecurityRiskManagementFrameworkProvider";
import {
  useSecurityComplianceFramework,
  SecurityComplianceFrameworkContext,
} from "@/context/SecurityComplianceFrameworkProvider";
import {
  useSecurityAuditFramework,
  SecurityAuditFrameworkContext,
} from "@/context/SecurityAuditFrameworkProvider";
import {
  useSecurityControlFramework,
  SecurityControlFrameworkContext,
} from "@/context/SecurityControlFrameworkProvider";
import {
  useSecurityGovernanceFramework,
  SecurityGovernanceFrameworkContext,
} from "@/context/SecurityGovernanceFrameworkProvider";
import {
  useSecurityPolicyFramework,
  SecurityPolicyFrameworkContext,
} from "@/context/SecurityPolicyFrameworkProvider";
import {
  useSecurityStandardFramework,
  SecurityStandardFrameworkContext,
} from "@/context/SecurityStandardFrameworkProvider";
import {
  useSecurityProcedureFramework,
  SecurityProcedureFrameworkContext,
} from "@/context/SecurityProcedureFrameworkProvider";
import {
  useSecurityGuidelineFramework,
  SecurityGuidelineFrameworkContext,
} from "@/context/SecurityGuidelineFrameworkProvider";
import {
  useSecurityBestPracticeFramework,
  SecurityBestPracticeFrameworkContext,
} from "@/context/SecurityBestPracticeFrameworkProvider";
import {
  useSecurityCodeOfConductFramework,
  SecurityCodeOfConductFrameworkContext,
} from "@/context/SecurityCodeOfConductFrameworkProvider";
import {
  useSecurityEthicsFramework,
  SecurityEthicsFrameworkContext,
} from "@/context/SecurityEthicsFrameworkProvider";
import {
  useSecurityValuesFramework,
  SecurityValuesFrameworkContext,
} from "@/context/SecurityValuesFrameworkProvider";
import {
  useSecurityCultureFramework,
  SecurityCultureFrameworkContext,
} from "@/context/SecurityCultureFrameworkProvider";
import {
  useSecurityAwarenessFramework,
  SecurityAwarenessFrameworkContext,
} from "@/context/SecurityAwarenessFrameworkProvider";
import {
  useSecurityTrainingFramework,
  SecurityTrainingFrameworkContext,
} from "@/context/SecurityTrainingFrameworkProvider";
import {
  useSecurityCertificationFramework,
  SecurityCertificationFrameworkContext,
} from "@/context/SecurityCertificationFrameworkProvider";
import {
  useSecurityEducationFramework,
  SecurityEducationFrameworkContext,
} from "@/context/SecurityEducationFrameworkProvider";
import {
  useSecurityResearchFramework,
  SecurityResearchFrameworkContext,
} from "@/context/SecurityResearchFrameworkProvider";
import {
  useSecurityInnovationFramework,
  SecurityInnovationFrameworkContext,
} from "@/context/SecurityInnovationFrameworkProvider";
import {
  useSecurityFutureFramework,
  SecurityFutureFrameworkContext,
} from "@/context/SecurityFutureFrameworkProvider";
import {
  useSecurityMetaverseFramework,
  SecurityMetaverseFrameworkContext,
} from "@/context/SecurityMetaverseFrameworkProvider";
import {
  useSecurityWeb3Framework,
  SecurityWeb3FrameworkContext,
} from "@/context/SecurityWeb3FrameworkProvider";
import {
  useSecurityArvrFramework,
  SecurityArvrFrameworkContext,
} from "@/context/SecurityArvrFrameworkProvider";
import {
  useSecurityRoboticsFramework,
  SecurityRoboticsFrameworkContext,
} from "@/context/SecurityRoboticsFrameworkProvider";
import {
  useSecurityAutomationFramework,
  SecurityAutomationFrameworkContext,
} from "@/context/SecurityAutomationFrameworkProvider";
import {
  useSecurityAiotFramework,
  SecurityAiotFrameworkContext
